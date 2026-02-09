using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.Infrastructure.Data;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly VehicleDbContext _context;

        public UserRepository(VehicleDbContext context)
        {
            _context = context;
        }

        public async Task<User> AddAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> GetByIdAsync(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
