using VehiclePlatform.API.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehiclePlatform.API.Domain.Entities
{
    public class Announcement
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required, MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Range(0, int.MaxValue)]
        public int Mileage { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [Required]
        public AnnouncementType AnnouncementType { get; set; }

        [Required, MaxLength(50)]
        public string Brand { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string Model { get; set; } = string.Empty;

        [Required]
        public VehicleType VehicleType { get; set; }

        [Required]
        public FuelType FuelType { get; set; }

        [Required]
        public TransmissionType Transmission { get; set; }

        [MaxLength(30)]
        public string Color { get; set; } = string.Empty;

        // Navigation
        public List<AnnouncementFile> Files { get; set; } = new();

        [Required]
        public string ApplicationUserId { get; set; } = string.Empty;
        public ApplicationUser? CreatedBy { get; set; }

        // Tracking
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class AnnouncementFile
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(255)]
        public string FileName { get; set; } = string.Empty;

        [Required, MaxLength(500)]
        public string FilePath { get; set; } = string.Empty;

        [Range(0, long.MaxValue)]
        public long Size { get; set; }

        [MaxLength(100)]
        public string ContentType { get; set; } = string.Empty;

        // Optional thumbnail for images
        public string? ThumbnailPath { get; set; }

        // Navigation
        [ForeignKey(nameof(Announcement))]
        public Guid AnnouncementId { get; set; }
        public Announcement? Announcement { get; set; }
    }
}

