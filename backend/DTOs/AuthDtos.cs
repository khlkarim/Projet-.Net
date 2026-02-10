using System.ComponentModel.DataAnnotations;

namespace VehiclePlatform.API.DTOs
{
    public class LoginRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponseDto
    {
        [Required]
        public ApplicationUserResponseDto User { get; set; } = null!;

        [Required]
        public string Token { get; set; } = string.Empty;
    }

    public class RegisterRequestDto
    {
        [Required]
        [MinLength(3)]
        [MaxLength(32)]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(256)] 
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(8)]
        [MaxLength(100)]
        public string Password { get; set; } = string.Empty;
    }

    public class RegisterResponseDto
    {
        [Required]
        public string Status { get; set; } = string.Empty;
    }
}

