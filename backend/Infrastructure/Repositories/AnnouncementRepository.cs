using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.Infrastructure.Data;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Infrastructure.Repositories
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly VehicleDbContext _context;

        public AnnouncementRepository(VehicleDbContext context)
        {
            _context = context;
        }

        public async Task<Announcement> AddAsync(Announcement announcement)
        {
            _context.Announcements.Add(announcement);
            await _context.SaveChangesAsync();
            return announcement;
        }

        public async Task<Announcement> GetByIdAsync(Guid id)
        {
            return await _context.Announcements
                .Include(a => a.Files) // include files
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<List<Announcement>> GetAsync()
        {
            return await _context.Announcements
                .Include(a => a.Files) // include files
                .ToListAsync();
        }

        public async Task<Announcement> UpdateAsync(Announcement announcement)
        {
            _context.Announcements.Update(announcement);
            await _context.SaveChangesAsync();
            return announcement;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var announcement = await _context.Announcements
                .Include(a => a.Files) // include files
                .FirstOrDefaultAsync(a => a.Id == id);

            if (announcement == null) return false;

            _context.Announcements.Remove(announcement);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

