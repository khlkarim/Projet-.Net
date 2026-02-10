using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.DTOs
{
    public class AnnouncementDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;  
        public int Mileage { get; set; }
        public decimal Price { get; set; }
        public AnnouncementType AnnouncementType { get; set; }
        public string Brand { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public VehicleType VehicleType { get; set; }
        public FuelType FuelType { get; set; }
        public TransmissionType Transmission { get; set; }
        public string Color { get; set; } = string.Empty;
        public List<IFormFile>? Files { get; set; }
    }

    public class AnnouncementResponseDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;  
        public int Mileage { get; set; }
        public decimal Price { get; set; }
        public AnnouncementType AnnouncementType { get; set; }
        public string Brand { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public VehicleType VehicleType { get; set; }
        public FuelType FuelType { get; set; }
        public TransmissionType Transmission { get; set; }
        public string Color { get; set; } = string.Empty;
        public List<AnnouncementFileDto> Files { get; set; } = new();
    }
    
    public class AnnouncementFileDto
    {
        public string FileName { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
    }
}
