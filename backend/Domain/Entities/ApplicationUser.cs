using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace VehiclePlatform.API.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        public string? ProfilePicture { get; set; }

        // Navigation
        public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
        public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
        public virtual ICollection<Announcement> Announcements { get; set; } = new List<Announcement>();
        public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    }
}
