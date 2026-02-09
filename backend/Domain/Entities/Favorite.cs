using System;

namespace VehiclePlatform.API.Domain.Entities
{
    public class Favorite
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid AnnouncementId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
