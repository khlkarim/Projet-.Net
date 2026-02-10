using System.ComponentModel.DataAnnotations;

namespace VehiclePlatform.API.DTOs
{
    public class CreateReviewDto
    {
        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }

        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string Content { get; set; } = string.Empty;

        [Required]
        public Guid AnnouncementId { get; set; }
    }

    public class UpdateReviewDto
    {
        [Range(1, 5)]
        public int? Rating { get; set; }

        [MaxLength(100)]
        public string? Title { get; set; }

        [MaxLength(1000)]
        public string? Content { get; set; }
    }

    public class ReviewResponseDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public int Rating { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        [Required]
        public string ApplicationUserId { get; set; } = string.Empty;

        [Required]
        public Guid AnnouncementId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }
    }
}

