using System;
using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.DTOs
{
    public class ExpertiseDto
    {
        public Guid VehicleId { get; set; }
        public Guid ExpertId { get; set; }
        public Guid AnnouncementId { get; set; }
        public DateTime ExpertiseDate { get; set; }
        public string Notes { get; set; }
    }
}
