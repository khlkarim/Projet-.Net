using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Interfaces;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.Infrastructure.Data;

namespace VehiclePlatform.API.Infrastructure.Repositories
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly VehicleDbContext _context;

        public AnnouncementRepository(VehicleDbContext context)
        {
            _context = context;
        }

        public async Task<Announcement> CreateAsync(Announcement announcement)
        {
            _context.Announcements.Add(announcement);
            await _context.SaveChangesAsync();
            return announcement;
        }

        public async Task<Announcement> GetByIdAsync(Guid id)
        {
            return await _context.Announcements
                .Include(a => a.Files) // eager load files
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<List<Announcement>> GetAllAsync()
        {
            return await _context.Announcements
                .Include(a => a.Files)
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Announcement>> GetAllByUserIdAsync(string userId)
        {
            return await _context.Announcements
                .Where(a => a.ApplicationUserId == userId)
                .Include(a => a.Files)
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();
        }

        public async Task<Announcement> UpdateAsync(Announcement announcement)
        {
            announcement.UpdatedAt = DateTime.UtcNow;
            _context.Announcements.Update(announcement);
            await _context.SaveChangesAsync();
            return announcement;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var announcement = await _context.Announcements.FindAsync(id);
            if (announcement == null) return false;

            _context.Announcements.Remove(announcement);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

