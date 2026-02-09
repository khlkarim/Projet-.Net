using System;
using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.DTOs
{
    public class ReviewDto
    {
        public Guid? AnnouncementId { get; set; }
        public Guid? SellerId { get; set; }
        public ReviewType Type { get; set; }
        public int Rating { get; set; }
        public string Title { get; set; }
        public string Comment { get; set; }
    }
}
