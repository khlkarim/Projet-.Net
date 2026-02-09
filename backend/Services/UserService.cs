using System;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.Domain.Enums;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> RegisterAsync(UserDto userDto)
        {
            // Basic mapping - in real app use AutoMapper
            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = userDto.Email,
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                PhoneNumber = userDto.PhoneNumber,
                Address = userDto.Address,
                Role = UserRole.Customer, // Default role
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
                PasswordHash = userDto.Password // INSECURE: In real app, hash this!
            };

            return await _userRepository.AddAsync(user);
        }

        public async Task<string> LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null || user.PasswordHash != password) // INSECURE comparison
            {
                return null;
            }

            // Return a dummy token for now. In real app, generate JWT.
            return $"dummy-jwt-token-for-{user.Id}";
        }

        public async Task<User> GetUserByIdAsync(Guid id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task<User> UpdateUserAsync(Guid id, UserDto userDto)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return null;

            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.PhoneNumber = userDto.PhoneNumber;
            user.Address = userDto.Address;
            // logic to update password if provided etc.

            return await _userRepository.UpdateAsync(user);
        }

        public async Task<bool> VerifyUserAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return false;

            user.IsVerified = true;
            await _userRepository.UpdateAsync(user);
            return true;
        }

        public async Task<bool> DeactivateUserAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return false;

            user.IsActive = false;
            await _userRepository.UpdateAsync(user);
            return true;
        }
    }
}
