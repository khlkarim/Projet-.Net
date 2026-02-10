using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Infrastructure.Data
{
    public class VehicleDbContext : IdentityDbContext<ApplicationUser>
    {
        public VehicleDbContext(DbContextOptions<VehicleDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<TechnicalExpertise> TechnicalExpertises { get; set; }
        public DbSet<ExpertiseCheckPoint> ExpertiseCheckPoints { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure simple relationships or let conventions handle it
            // For example, one-to-many is usually auto-detected.
            
            modelBuilder.Entity<Announcement>()
                .Property(a => a.Price)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Announcement>()
                .Property(a => a.RentalPricePerDay)
                .HasColumnType("decimal(18,2)");
                
            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<TechnicalExpertise>()
                .Property(t => t.TotalScore)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Reservation>()
                .Property(r => r.TotalPrice)
                .HasColumnType("decimal(18,2)");
                
            // Use conversion for List<string> ImageUrls in Announcement if not using a separate table
            // Ideally should be a separate table, but for simplicity here we can serialize or leave as is (requires ValueConverter)
            // Or just ignore if EF Core doesn't support List<string> directly without configuration.
            // I'll add a simple conversion to JSON string for ImageUrls
            modelBuilder.Entity<Announcement>()
                .Property(e => e.ImageUrls)
                .HasConversion(
                    v => string.Join(';', v),
                    v => new System.Collections.Generic.List<string>(v.Split(new[] { ';' }, System.StringSplitOptions.RemoveEmptyEntries)));
        }
    }
}
