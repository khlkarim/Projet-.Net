using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.Domain.Enums;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Infrastructure.Data;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Services
{
    public class ReservationService : IReservationService
    {
        private readonly VehicleDbContext _context;

        public ReservationService(VehicleDbContext context)
        {
            _context = context;
        }

        public async Task<Reservation> CreateReservationAsync(ReservationDto dto)
        {
            var reservation = new Reservation
            {
                Id = Guid.NewGuid(),
                AnnouncementId = dto.AnnouncementId,
                UserId = dto.UserId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Status = ReservationStatus.Pending,
                Notes = dto.Notes,
                CreatedAt = DateTime.UtcNow
            };

            // Calculate price based on Announcement price
            var announcement = await _context.Announcements.FindAsync(dto.AnnouncementId);
            if (announcement != null && announcement.RentalPricePerDay.HasValue)
            {
                reservation.CalculateTotalPrice(announcement.RentalPricePerDay.Value);
            }

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
            return reservation;
        }

        public async Task<Reservation> GetReservationByIdAsync(Guid id)
        {
            return await _context.Reservations.FindAsync(id);
        }

        public async Task<bool> ConfirmReservationAsync(Guid id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null) return false;

            reservation.Confirm();
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CancelReservationAsync(Guid id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null) return false;

            reservation.Cancel();
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Reservation>> GetUserReservationsAsync(Guid userId)
        {
            return await _context.Reservations.ToListAsync(); // Should filter by UserId
        }
    }
}
