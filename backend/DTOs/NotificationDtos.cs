using System.ComponentModel.DataAnnotations;

namespace VehiclePlatform.API.DTOs
{
    public class CreateNotificationDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Content { get; set; } = string.Empty;

        [Required]
        [MinLength(1)]
        public ICollection<string> RecipientIds { get; set; } = new List<string>();
    }

    public class UpdateNotificationDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Content { get; set; } = string.Empty;

        [Required]
        [MinLength(1)]
        public ICollection<string> RecipientIds { get; set; } = new List<string>();
    }

    public class NotificationResponseDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public ICollection<string> RecipientIds { get; set; } = new List<string>();

        [Required]
        public DateTime CreatedAt { get; set; }
    }
}

