using System;
using System.Collections.Generic;
using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.DTOs
{
    public class AnnouncementDto
    {
        public Guid VehicleId { get; set; }
        public AnnouncementType Type { get; set; }
        public decimal Price { get; set; }
        public decimal? RentalPricePerDay { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public List<string> ImageUrls { get; set; }
    }
}
