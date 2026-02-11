using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Infrastructure.Data.Seeders
{
    public static class NotificationSeeder
    {
        public static async Task SeedAsync(VehicleDbContext context)
        {
            if (await context.Notifications.AnyAsync()) return;

            var users = await context.Users.ToListAsync();

            var notification = new Notification
            {
                Title = "Welcome to Vehicle Platform!",
                Content = "Thank you for registering.",
            };

            foreach (var user in users)
                notification.Recipients.Add(user);

            context.Notifications.Add(notification);
            await context.SaveChangesAsync();
        }
    }
}
