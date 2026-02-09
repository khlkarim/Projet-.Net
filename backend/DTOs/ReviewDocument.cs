using System;
using System.Collections.Generic;

namespace VehiclePlatform.API.DTOs
{
    public class ReviewDocument
    {
        public string Id { get; set; }
        public Guid AnnouncementId { get; set; }
        public Guid SellerId { get; set; }
        public Guid UserId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public Dictionary<string, object> Metadata { get; set; } = new Dictionary<string, object>();
    }
}
