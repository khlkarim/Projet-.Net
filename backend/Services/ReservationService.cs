using VehiclePlatform.API.DTOs;
using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Interfaces;
using VehiclePlatform.API.Domain.Enums;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.Infrastructure.Data;

namespace VehiclePlatform.API.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IReservationRepository _repository;
        private readonly VehicleDbContext  _context; // Needed to check announcement creator

        public ReservationService(IReservationRepository repository, VehicleDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<ReservationResponseDto> CreateAsync(CreateReservationDto dto, string userId)
        {
            var reservation = new Reservation
            {
                AnnouncementId = dto.AnnouncementId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Status = ReservationStatus.Pending,
                ApplicationUserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            var created = await _repository.CreateAsync(reservation);
            return MapToResponse(created);
        }

        public async Task<List<ReservationResponseDto>> GetAllAsync()
        {
            var reservations = await _repository.GetAllAsync();
            return reservations.Select(MapToResponse).ToList();
        }

        public async Task<List<ReservationResponseDto>> GetAllByUserIdAsync(string userId)
        {
            var reservations = await _repository.GetAllByUserIdAsync(userId);
            return reservations.Select(MapToResponse).ToList();
        }

        public async Task<List<ReservationResponseDto>> GetAllByAnnouncementIdAsync(Guid announcementId)
        {
            var reservations = await _repository.GetAllByAnnouncementIdAsync(announcementId);
            return reservations.Select(MapToResponse).ToList();
        }

        public async Task<ReservationResponseDto> GetByIdAsync(Guid id)
        {
            var reservation = await _repository.GetByIdAsync(id);
            if (reservation == null)
                throw new KeyNotFoundException("Reservation not found.");
            return MapToResponse(reservation);
        }

        public async Task<ReservationResponseDto> UpdateAsync(Guid id, UpdateReservationDto dto, string userId)
        {
            var reservation = await _repository.GetByIdAsync(id);
            if (reservation == null)
                throw new KeyNotFoundException("Reservation not found.");

            // Fetch the announcement to check creator
            var announcement = await _context.Announcements
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == reservation.AnnouncementId);

            if (announcement == null)
                throw new KeyNotFoundException("Associated announcement not found.");

            // Status can only be updated by announcement creator
            if (dto.Status.HasValue)
            {
                if (announcement.ApplicationUserId != userId)
                    throw new UnauthorizedAccessException("Only the announcement creator can update the status.");
                reservation.Status = dto.Status.Value;
            }

            // Start/End dates can only be updated by reservation creator
            if (dto.StartDate.HasValue || dto.EndDate.HasValue)
            {
                if (reservation.ApplicationUserId != userId)
                    throw new UnauthorizedAccessException("Only the reservation creator can update start/end dates.");

                reservation.StartDate = dto.StartDate ?? reservation.StartDate;
                reservation.EndDate = dto.EndDate ?? reservation.EndDate;
            }

            var updated = await _repository.UpdateAsync(reservation);
            return MapToResponse(updated);
        }

        public async Task<ReservationResponseDto> DeleteAsync(Guid id, string userId)
        {
            var reservation = await _repository.GetByIdAsync(id);
            if (reservation == null)
                throw new KeyNotFoundException("Reservation not found.");

            // Only reservation creator can delete
            if (reservation.ApplicationUserId != userId)
                throw new UnauthorizedAccessException("Only the reservation creator can delete this reservation.");

            var deleted = await _repository.DeleteAsync(id);
            if (!deleted)
                throw new InvalidOperationException("Failed to delete reservation.");

            return MapToResponse(reservation);
        }

        private static ReservationResponseDto MapToResponse(Reservation reservation)
        {
            return new ReservationResponseDto
            {
                Id = reservation.Id,
                AnnouncementId = reservation.AnnouncementId,
                ApplicationUserId = reservation.ApplicationUserId,
                StartDate = reservation.StartDate,
                EndDate = reservation.EndDate,
                Status = reservation.Status,
                CreatedAt = reservation.CreatedAt
            };
        }
    }
}

