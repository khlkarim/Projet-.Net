using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.DTOs;

namespace VehiclePlatform.API.Interfaces
{
    public interface INotificationService
    {
        Task<Notification> SendNotificationAsync(NotificationDto notificationDto);
        Task<List<Notification>> GetUserNotificationsAsync(Guid userId);
        Task<bool> MarkAsReadAsync(Guid notificationId);
        Task<bool> MarkAllAsReadAsync(Guid userId);
    }
}
