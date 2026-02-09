using System;

namespace VehiclePlatform.API.Domain.Entities
{
    public class Message
    {
        public Guid Id { get; set; }
        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; }
        public Guid? AnnouncementId { get; set; }
        public string Content { get; set; }
        public DateTime SentAt { get; set; }
        public bool IsRead { get; set; }

        public void MarkAsRead()
        {
            IsRead = true;
        }
    }
}
