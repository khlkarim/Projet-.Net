using VehiclePlatform.API.DTOs;
using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Interfaces;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.Infrastructure.Data;

namespace VehiclePlatform.API.Services
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _repository;
        private readonly VehicleDbContext _context; // Needed to resolve users

        public NotificationService(INotificationRepository repository, VehicleDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<NotificationResponseDto> CreateAsync(CreateNotificationDto dto)
        {
            // Resolve users
            var recipients = await _context.Users
                .Where(u => dto.RecipientIds.Contains(u.Id))
                .ToListAsync();

            if (!recipients.Any())
                throw new KeyNotFoundException("No valid recipients found.");

            var notification = new Notification
            {
                Title = dto.Title,
                Content = dto.Content,
                Recipients = recipients,
                CreatedAt = DateTime.UtcNow
            };

            var created = await _repository.CreateAsync(notification);
            return MapToResponse(created);
        }

        public async Task<List<NotificationResponseDto>> GetAllAsync()
        {
            var notifications = await _repository.GetAllAsync();
            return notifications.Select(MapToResponse).ToList();
        }

        public async Task<List<NotificationResponseDto>> GetAllByUserIdAsync(string userId)
        {
            var notifications = await _repository.GetAllByUserIdAsync(userId);
            return notifications.Select(MapToResponse).ToList();
        }

        public async Task<NotificationResponseDto> GetByIdAsync(Guid id)
        {
            var notification = await _repository.GetByIdAsync(id);
            if (notification == null)
                throw new KeyNotFoundException("Notification not found.");
            return MapToResponse(notification);
        }

        public async Task<NotificationResponseDto> UpdateAsync(Guid id, UpdateNotificationDto dto)
        {
            var notification = await _repository.GetByIdAsync(id);
            if (notification == null)
                throw new KeyNotFoundException("Notification not found.");

            // Resolve recipients
            var recipients = await _context.Users
                .Where(u => dto.RecipientIds.Contains(u.Id))
                .ToListAsync();

            if (!recipients.Any())
                throw new KeyNotFoundException("No valid recipients found.");

            notification.Title = dto.Title;
            notification.Content = dto.Content;
            notification.Recipients = recipients;

            var updated = await _repository.UpdateAsync(notification);
            return MapToResponse(updated);
        }

        public async Task<NotificationResponseDto> DeleteAsync(Guid id)
        {
            var notification = await _repository.GetByIdAsync(id);
            if (notification == null)
                throw new KeyNotFoundException("Notification not found.");

            var deleted = await _repository.DeleteAsync(id);
            if (!deleted)
                throw new InvalidOperationException("Failed to delete notification.");

            return MapToResponse(notification);
        }

        private static NotificationResponseDto MapToResponse(Notification notification)
        {
            return new NotificationResponseDto
            {
                Id = notification.Id,
                Title = notification.Title,
                Content = notification.Content,
                RecipientIds = notification.Recipients.Select(u => u.Id).ToList(),
                CreatedAt = notification.CreatedAt
            };
        }
    }
}

