using System;

namespace VehiclePlatform.API.DTOs
{
    public class MessageDto
    {
        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; }
        public Guid? AnnouncementId { get; set; }
        public string Content { get; set; }
    }
}
