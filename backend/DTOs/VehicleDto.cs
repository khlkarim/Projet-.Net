using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.DTOs
{
    public class VehicleDto
    {
        public string VIN { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public VehicleType Type { get; set; }
        public FuelType FuelType { get; set; }
        public TransmissionType Transmission { get; set; }
        public int Mileage { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
    }
}
