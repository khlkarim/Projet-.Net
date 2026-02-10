using System.ComponentModel.DataAnnotations;

namespace VehiclePlatform.API.DTOs
{
    /* ============================
     * Update (PATCH semantics)
     * ============================ */
    public class UpdateApplicationUserDto
    {
        [MaxLength(256)]
        public string? UserName { get; set; }

        [EmailAddress]
        [MaxLength(256)]
        public string? Email { get; set; }

        [MaxLength(50)]
        public string? FirstName { get; set; }

        [MaxLength(50)]
        public string? LastName { get; set; }

        // Uploaded file, NOT a string path
        public IFormFile? ProfilePicture { get; set; }
    }

    /* ============================
     * Response
     * ============================ */
    public class ApplicationUserResponseDto
    {
        public string Id { get; set; } = string.Empty;

        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;

        // Public URL or relative path
        public string? ProfilePicture { get; set; }
    }
}


