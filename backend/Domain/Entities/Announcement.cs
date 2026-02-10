using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.Domain.Entities
{
    public class Announcement
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
        public List<AnnouncementFile> Files { get; set; } = new();

        public string ApplicationUserId { get; set; } = string.Empty;
        public ApplicationUser? CreatedBy { get; set; }
    }

    public class AnnouncementFile
    {
        public int Id { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
        public long Size { get; set; }
        public string ContentType { get; set; } = string.Empty;

        public int AnnouncementId { get; set; }
        public Announcement? Announcement { get; set; }
    }
}

