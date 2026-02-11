using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Infrastructure.Data.Seeders
{
    public static class ReviewSeeder
    {
        public static async Task SeedAsync(VehicleDbContext context)
        {
            if (await context.Reviews.AnyAsync()) return;

            var user = await context.Users.FirstAsync(u => u.UserName == "user@vehicle.com");
            var announcement = await context.Announcements.FirstAsync();

            var review = new Review
            {
                Rating = 5,
                Title = "Amazing car",
                Content = "I loved this BMW, highly recommended!",
                ApplicationUserId = user.Id,
                AnnouncementId = announcement.Id
            };

            context.Reviews.Add(review);
            await context.SaveChangesAsync();
        }
    }
}
