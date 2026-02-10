using VehiclePlatform.API.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace VehiclePlatform.API.DTOs
{
    /* ============================
     * Create
     * ============================ */
    public class CreateAnnouncementDto
    {
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

        // Optional on creation
        public List<IFormFile>? Files { get; set; }
    }

    /* ============================
     * Update (PATCH semantics)
     * ============================ */
    public class UpdateAnnouncementDto
    {
        [MaxLength(100)]
        public string? Title { get; set; }

        [MaxLength(1000)]
        public string? Description { get; set; }

        [Range(0, int.MaxValue)]
        public int? Mileage { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? Price { get; set; }

        public AnnouncementType? AnnouncementType { get; set; }

        [MaxLength(50)]
        public string? Brand { get; set; }

        [MaxLength(50)]
        public string? Model { get; set; }

        public VehicleType? VehicleType { get; set; }

        public FuelType? FuelType { get; set; }

        public TransmissionType? Transmission { get; set; }

        [MaxLength(30)]
        public string? Color { get; set; }

        // Additive uploads only (no delete here)
        public List<IFormFile>? Files { get; set; }
    }

    /* ============================
     * Response
     * ============================ */
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

        public string CreatedByUserId { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public List<AnnouncementFileDto> Files { get; set; } = new();
    }

    /* ============================
     * File Metadata
     * ============================ */
    public class AnnouncementFileDto
    {
        public int Id { get; set; }

        public string FileName { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;

        public long Size { get; set; }
        public string ContentType { get; set; } = string.Empty;
    }
}
