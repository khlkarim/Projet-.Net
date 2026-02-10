using System.ComponentModel.DataAnnotations;

namespace VehiclePlatform.API.Domain.Entities
{
    public class Notification
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required, MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required, MaxLength(1000)]
        public string Content { get; set; } = string.Empty;

        // Many-to-many with ApplicationUser
        public virtual ICollection<ApplicationUser> Recipients { get; set; } = new List<ApplicationUser>();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
