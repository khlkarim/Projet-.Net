using System.ComponentModel.DataAnnotations;

namespace VehiclePlatform.API.Domain.Entities
{
    public class Review
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Range(1, 5)]
        public int Rating { get; set; }

        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string Content { get; set; } = string.Empty;

        [Required]
        public string ApplicationUserId { get; set; } = string.Empty;
        public ApplicationUser? CreatedBy { get; set; }

        [Required]
        public Guid AnnouncementId { get; set; }
        public Announcement? Announcement { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
