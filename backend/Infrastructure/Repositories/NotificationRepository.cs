using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Interfaces;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.Infrastructure.Data;

namespace VehiclePlatform.API.Infrastructure.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly VehicleDbContext _context;

        public NotificationRepository(VehicleDbContext context)
        {
            _context = context;
        }

        public async Task<Notification> CreateAsync(Notification notification)
        {
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            return notification;
        }

        public async Task<Notification> GetByIdAsync(Guid id)
        {
            return await _context.Notifications
                .Include(n => n.Recipients)
                .FirstOrDefaultAsync(n => n.Id == id);
        }

        public async Task<List<Notification>> GetAllAsync()
        {
            return await _context.Notifications
                .Include(n => n.Recipients)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Notification>> GetAllByUserIdAsync(string userId)
        {
            return await _context.Notifications
                .Where(n => n.Recipients.Any(u => u.Id == userId))
                .Include(n => n.Recipients)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }

        public async Task<Notification> UpdateAsync(Notification notification)
        {
            _context.Notifications.Update(notification);
            await _context.SaveChangesAsync();
            return notification;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null) return false;

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
