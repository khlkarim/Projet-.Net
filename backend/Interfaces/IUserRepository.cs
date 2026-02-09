using System;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Interfaces
{
    public interface IUserRepository
    {
        Task<User> AddAsync(User user);
        Task<User> GetByIdAsync(Guid id);
        Task<User> GetByEmailAsync(string email);
        Task<User> UpdateAsync(User user);
        Task<bool> DeleteAsync(Guid id);
    }
}
