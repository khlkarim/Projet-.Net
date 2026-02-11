using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.Infrastructure.Data.Seeders
{
    public static class ReservationSeeder
    {
        public static async Task SeedAsync(VehicleDbContext context)
        {
            if (await context.Reservations.AnyAsync()) return;

            var user = await context.Users.FirstAsync(u => u.UserName == "user@vehicle.com");
            var announcement = await context.Announcements.FirstAsync();

            var reservation = new Reservation
            {
                StartDate = DateTime.UtcNow.AddDays(1),
                EndDate = DateTime.UtcNow.AddDays(7),
                Status = ReservationStatus.Pending,
                ApplicationUserId = user.Id,
                AnnouncementId = announcement.Id
            };

            context.Reservations.Add(reservation);
            await context.SaveChangesAsync();
        }
    }
}
