using System;
using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.Domain.Entities
{
    // Although listed as an entity, this acts more like a query object.
    public class SearchFilter
    {
        public string Brand { get; set; }
        public string Model { get; set; }
        public int? MinYear { get; set; }
        public int? MaxYear { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public int? MaxMileage { get; set; }
        public VehicleType? Type { get; set; }
        public FuelType? FuelType { get; set; }
        public TransmissionType? Transmission { get; set; }
        public string Location { get; set; }
        public AnnouncementType? AnnouncementType { get; set; }
        public bool? OnlyVerified { get; set; }

        public string BuildQuery()
        {
            // Simple string representation for debugging or logging
            return $"Brand={Brand}, Model={Model}, ..."; 
        }
    }
}
