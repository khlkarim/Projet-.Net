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
    public class MessageService : IMessageService
    {
        private readonly VehicleDbContext _context;
        private readonly INotificationService _notificationService;

        public MessageService(VehicleDbContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        public async Task<Message> SendMessageAsync(MessageDto dto)
        {
            var message = new Message
            {
                Id = Guid.NewGuid(),
                SenderId = dto.SenderId,
                ReceiverId = dto.ReceiverId,
                AnnouncementId = dto.AnnouncementId,
                Content = dto.Content,
                SentAt = DateTime.UtcNow,
                IsRead = false
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            // Notify receiver
            await _notificationService.SendNotificationAsync(new NotificationDto
            {
                UserId = dto.ReceiverId,
                Type = Domain.Enums.NotificationType.NewMessage,
                Title = "New Message",
                Message = $"You have a new message.",
                ActionUrl = $"/messages/{message.Id}"
            });

            return message;
        }

        public async Task<List<Message>> GetConversationAsync(Guid user1Id, Guid user2Id)
        {
            return await _context.Messages
                .Where(m => (m.SenderId == user1Id && m.ReceiverId == user2Id) || 
                            (m.SenderId == user2Id && m.ReceiverId == user1Id))
                .OrderBy(m => m.SentAt)
                .ToListAsync();
        }

        public async Task<bool> MarkAsReadAsync(Guid messageId)
        {
            var message = await _context.Messages.FindAsync(messageId);
            if (message == null) return false;

            message.MarkAsRead();
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<int> GetUnreadCountAsync(Guid userId)
        {
            return await _context.Messages.CountAsync(m => m.ReceiverId == userId && !m.IsRead);
        }
    }
}
