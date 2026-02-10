using VehiclePlatform.API.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace VehiclePlatform.API.Domain.Entities
{
    public class Reservation
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public ReservationStatus Status { get; set; } = ReservationStatus.Pending;

        [Required]
        public string ApplicationUserId { get; set; } = string.Empty;
        public ApplicationUser? CreatedBy { get; set; }

        [Required]
        public Guid AnnouncementId { get; set; }
        public Announcement? Announcement { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
