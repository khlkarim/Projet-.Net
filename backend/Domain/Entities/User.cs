using System;
using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public UserRole Role { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsVerified { get; set; }
        public bool IsActive { get; set; }
        public string ProfileImageUrl { get; set; }

        public void Validate()
        {
            // TODO: Implement validation logic
        }

        public void UpdateProfile(string firstName, string lastName, string phoneNumber, string address)
        {
            FirstName = firstName;
            LastName = lastName;
            PhoneNumber = phoneNumber;
            Address = address;
            UpdatedAt = DateTime.UtcNow;
        }

        public void ChangePassword(string newPasswordHash)
        {
            PasswordHash = newPasswordHash;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
