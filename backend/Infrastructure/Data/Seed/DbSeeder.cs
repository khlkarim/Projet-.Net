using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Infrastructure.Data.Seeders
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<VehicleDbContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            // Apply migrations automatically
            await context.Database.MigrateAsync();

            // Run all seeders in order
            await UserSeeder.SeedAsync(userManager);
            await NotificationSeeder.SeedAsync(context);
            await AnnouncementSeeder.SeedAsync(context);
            await ReviewSeeder.SeedAsync(context);
            await ReservationSeeder.SeedAsync(context);
        }
    }
}

