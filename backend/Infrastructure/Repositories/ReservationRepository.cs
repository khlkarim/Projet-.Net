using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.Interfaces;
using VehiclePlatform.API.Infrastructure.Data;

namespace VehiclePlatform.API.Infrastructure.Repositories
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly VehicleDbContext _context;

        public ReservationRepository(VehicleDbContext context)
        {
            _context = context;
        }

        public async Task<Reservation> CreateAsync(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
            return reservation;
        }

        public async Task<Reservation> GetByIdAsync(Guid id)
        {
            return await _context.Reservations
                .Include(r => r.CreatedBy)
                .Include(r => r.Announcement)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<List<Reservation>> GetAllAsync()
        {
            return await _context.Reservations
                .Include(r => r.CreatedBy)
                .Include(r => r.Announcement)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Reservation>> GetAllByUserIdAsync(string userId)
        {
            return await _context.Reservations
                .Where(r => r.ApplicationUserId == userId)
                .Include(r => r.CreatedBy)
                .Include(r => r.Announcement)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Reservation>> GetAllByAnnouncementIdAsync(Guid announcementId)
        {
            return await _context.Reservations
                .Where(r => r.AnnouncementId == announcementId)
                .Include(r => r.CreatedBy)
                .Include(r => r.Announcement)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<Reservation> UpdateAsync(Reservation reservation)
        {
            _context.Reservations.Update(reservation);
            await _context.SaveChangesAsync();
            return reservation;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null) return false;

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
