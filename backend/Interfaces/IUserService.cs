using System;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.DTOs;

namespace VehiclePlatform.API.Interfaces
{
    public interface IUserService
    {
        Task<User> RegisterAsync(UserDto userDto);
        Task<string> LoginAsync(string email, string password); // Returning Token as string
        Task<User> GetUserByIdAsync(Guid id);
        Task<User> UpdateUserAsync(Guid id, UserDto userDto);
        Task<bool> VerifyUserAsync(Guid id);
        Task<bool> DeactivateUserAsync(Guid id);
    }
}
