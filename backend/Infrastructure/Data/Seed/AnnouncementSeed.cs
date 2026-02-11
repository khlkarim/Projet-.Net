using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Domain.Enums;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Infrastructure.Data.Seeders
{
    public static class AnnouncementSeeder
    {
        public static async Task SeedAsync(VehicleDbContext context)
        {
            if (await context.Announcements.AnyAsync()) return;

            var admin = await context.Users.FirstAsync(u => u.UserName == "admin@vehicle.com");

            var announcement1 = new Announcement
            {
                Title = "BMW M3 2022",
                Description = "Excellent condition",
                Mileage = 15000,
                Price = 85000,
                AnnouncementType = AnnouncementType.Sale,
                Brand = "BMW",
                Model = "M3",
                VehicleType = VehicleType.Sedan,
                FuelType = FuelType.Petrol,
                Transmission = TransmissionType.Automatic,
                Color = "Red",
                ApplicationUserId = admin.Id
            };

            context.Announcements.Add(announcement1);
            await context.SaveChangesAsync();
        }
    }
}
