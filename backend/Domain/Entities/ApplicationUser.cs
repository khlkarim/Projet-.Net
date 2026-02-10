using Microsoft.AspNetCore.Identity;

namespace VehiclePlatform.API.Domain.Entities
{
  public class ApplicationUser : IdentityUser
  {
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public List<Announcement> Announcements { get; set; } = new();
  }
}
