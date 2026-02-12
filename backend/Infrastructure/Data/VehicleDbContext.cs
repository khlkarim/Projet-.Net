using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace VehiclePlatform.API.Infrastructure.Data
{
    public class VehicleDbContext : IdentityDbContext<ApplicationUser>
    {
        public VehicleDbContext(DbContextOptions<VehicleDbContext> options)
            : base(options)
        {
        }

        public DbSet<Announcement> Announcements => Set<Announcement>();
        public DbSet<AnnouncementFile> AnnouncementFiles => Set<AnnouncementFile>();
        public DbSet<Reservation> Reservations => Set<Reservation>();
        public DbSet<Review> Reviews => Set<Review>();
        public DbSet<Notification> Notifications => Set<Notification>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            /* -----------------------------
             * Announcement
             * ----------------------------- */
            modelBuilder.Entity<Announcement>(entity =>
            {
                entity.Property(a => a.Price)
                      .HasPrecision(18, 2);

                entity.HasOne(a => a.CreatedBy)
                      .WithMany(u => u.Announcements)
                      .HasForeignKey(a => a.ApplicationUserId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(a => a.Files)
                      .WithOne(f => f.Announcement)
                      .HasForeignKey(f => f.AnnouncementId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(a => a.ApplicationUserId);
                entity.HasIndex(a => a.Price);
            });

            /* -----------------------------
             * AnnouncementFile
             * ----------------------------- */
            modelBuilder.Entity<AnnouncementFile>(entity =>
            {
                entity.HasIndex(f => f.AnnouncementId);
            });

            /* -----------------------------
             * Reservation
             * ----------------------------- */
            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.HasOne(r => r.CreatedBy)
                      .WithMany(u => u.Reservations)
                      .HasForeignKey(r => r.ApplicationUserId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(r => r.Announcement)
                      .WithMany()
                      .HasForeignKey(r => r.AnnouncementId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(r => r.ApplicationUserId);
                entity.HasIndex(r => r.AnnouncementId);
            });

            /* -----------------------------
             * Review
             * ----------------------------- */
            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasOne(r => r.CreatedBy)
                      .WithMany(u => u.Reviews)
                      .HasForeignKey(r => r.ApplicationUserId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(r => r.Announcement)
                      .WithMany()
                      .HasForeignKey(r => r.AnnouncementId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(r => new { r.ApplicationUserId, r.AnnouncementId });
            });

            /* -----------------------------
             * Notification (Many-to-Many)
             * ----------------------------- */
            modelBuilder.Entity<Notification>()
                .HasMany(n => n.Recipients)
                .WithMany(u => u.Notifications)
                .UsingEntity<Dictionary<string, object>>(
                    "NotificationRecipient",
                    j => j
                        .HasOne<ApplicationUser>()
                        .WithMany()
                        .HasForeignKey("ApplicationUserId")
                        .OnDelete(DeleteBehavior.Cascade),
                    j => j
                        .HasOne<Notification>()
                        .WithMany()
                        .HasForeignKey("NotificationId")
                        .OnDelete(DeleteBehavior.Cascade),
                    j =>
                    {
                        j.HasKey("NotificationId", "ApplicationUserId");
                        j.HasIndex("ApplicationUserId");
                    }
                );
        }
    }
}

