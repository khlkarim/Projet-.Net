using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Infrastructure.Data;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Services
{
    public class NotificationService : INotificationService
    {
        private readonly VehicleDbContext _context;

        public NotificationService(VehicleDbContext context)
        {
            _context = context;
        }

        public async Task<Notification> SendNotificationAsync(NotificationDto dto)
        {
            var notification = new Notification
            {
                Id = Guid.NewGuid(),
                UserId = dto.UserId,
                Type = dto.Type,
                Title = dto.Title,
                Message = dto.Message,
                ActionUrl = dto.ActionUrl,
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            return notification;
        }

        public async Task<List<Notification>> GetUserNotificationsAsync(Guid userId)
        {
            return await _context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }

        public async Task<bool> MarkAsReadAsync(Guid notificationId)
        {
             var notification = await _context.Notifications.FindAsync(notificationId);
             if (notification == null) return false;

             notification.MarkAsRead();
             await _context.SaveChangesAsync();
             return true;
        }

        public async Task<bool> MarkAllAsReadAsync(Guid userId)
        {
            var notifications = await _context.Notifications
                .Where(n => n.UserId == userId && !n.IsRead)
                .ToListAsync();

            if (!notifications.Any()) return false;

            foreach (var n in notifications)
                n.MarkAsRead();

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
