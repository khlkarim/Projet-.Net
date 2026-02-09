using System;
using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.DTOs
{
    public class NotificationDto
    {
        public Guid UserId { get; set; }
        public NotificationType Type { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string ActionUrl { get; set; }
    }
}
