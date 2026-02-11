using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Infrastructure.Data.Seeders
{
    public static class UserSeeder
    {
        public static async Task SeedAsync(UserManager<ApplicationUser> userManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var admin = new ApplicationUser
            {
                UserName = "admin@vehicle.com",
                Email = "admin@vehicle.com",
                FirstName = "Admin",
                LastName = "User",
                EmailConfirmed = true
            };
            await userManager.CreateAsync(admin, "Admin123!");

            var user = new ApplicationUser
            {
                UserName = "user@vehicle.com",
                Email = "user@vehicle.com",
                FirstName = "Regular",
                LastName = "User",
                EmailConfirmed = true
            };
            await userManager.CreateAsync(user, "User123!");
        }
    }
}
