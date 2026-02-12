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

            var admin = await context.Users
                .FirstAsync(u => u.UserName == "admin@vehicle.com");

            Announcement CreateAnnouncement(
                string title,
                string brand,
                string model,
                VehicleType vehicleType,
                string color,
                decimal price,
                int mileage,
                params (string FileName, string Url)[] images)
            {
                var announcement = new Announcement
                {
                    Id = Guid.NewGuid(),
                    Title = title,
                    Description = $"Well maintained {brand} {model}.",
                    Mileage = mileage,
                    Price = price,
                    AnnouncementType = AnnouncementType.Sale,
                    Brand = brand,
                    Model = model,
                    VehicleType = vehicleType,
                    FuelType = FuelType.Petrol,
                    Transmission = TransmissionType.Automatic,
                    Color = color,
                    ApplicationUserId = admin.Id
                };

                int i = 0;
                foreach (var (fileName, url) in images)
                {
                    announcement.AnnouncementType = i%2 == 0? AnnouncementType.Sale : AnnouncementType.Rental;
                    i++;
                    announcement.Files.Add(new AnnouncementFile
                    {
                        FileName = fileName,
                        FilePath = url,
                        Size = 500000, // dev placeholder size
                        ContentType = "image/jpeg",
                        ThumbnailPath = null,
                        AnnouncementId = announcement.Id
                    });
                }

                return announcement;
            }

            var announcements = new List<Announcement>
            {
                // Real Unsplash photos for BMW M3
                CreateAnnouncement(
                    "BMW M3 2022", "BMW", "M3", VehicleType.Sedan, "Red", 85000, 15000,
                    ("bmw-m3-1.jpg", "https://images.unsplash.com/photo-1615644190630-c6c6f230a6ed?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), // real image :contentReference[oaicite:1]{index=1}
                    ("bmw-m3-2.jpg", "https://images.unsplash.com/photo-1628079586925-6e7792daaf0b?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") // real image :contentReference[oaicite:2]{index=2}
                ),

                // Mercedes (example links—note: specific model C300 may not be tagged, but generic Mercedes photos exist)
                CreateAnnouncement(
                    "Mercedes C300 2021", "Mercedes", "C300", VehicleType.Sedan, "Black", 65000, 22000,
                    ("mercedes-1.jpg", "https://images.unsplash.com/photo-1700189704995-dcd9ed0c8e41?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
                ),

                // Audi Q5 (generic Audi SUV photo set)
                CreateAnnouncement(
                    "Audi Q5 2020", "Audi", "Q5", VehicleType.SUV, "White", 54000, 30000,
                    ("audi-q5-1.jpg", "https://images.unsplash.com/photo-1605494541483-6d3d152c552f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8QXVkaSUyMFE1fGVufDB8fDB8fHww"),
                    ("audi-q5-2.jpg", "https://images.unsplash.com/photo-1710011116514-d2b8a7a97c54?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEF1ZGklMjBRNXxlbnwwfHwwfHx8MA%3D%3D")
                ),

                // Toyota Corolla (generic Toyota sedan photos)
                CreateAnnouncement(
                    "Toyota Corolla 2019", "Toyota", "Corolla", VehicleType.Sedan, "Blue", 22000, 45000,
                    ("toyota-corolla-1.jpg", "https://images.unsplash.com/photo-1626072557464-90403d788e8d?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
                ),

                // Ford Ranger (generic truck images)
                CreateAnnouncement(
                    "Ford Ranger 2023", "Ford", "Ranger", VehicleType.Truck, "Gray", 48000, 5000,
                    ("ford-ranger-1.jpg", "https://images.unsplash.com/photo-1638618164682-12b986ec2a75?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
                    ("ford-ranger-2.jpg", "https://images.unsplash.com/photo-1626072557464-90403d788e8d?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
                ),

                // Honda Civic (generic Honda photos)
                CreateAnnouncement(
                    "Honda Civic 2018", "Honda", "Civic", VehicleType.Sedan, "Silver", 18000, 60000,
                    ("honda-civic-1.jpg", "https://images.unsplash.com/photo-1631547891859-184677884115?q=80&w=1750&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
                ),

                // Tesla Model 3 (generic Tesla photos)
                CreateAnnouncement(
                    "Tesla Model 3 2022", "Tesla", "Model 3", VehicleType.Sedan, "White", 52000, 12000,
                    ("tesla-model3-1.jpg", "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVzbGElMjBtb2RlbCUyMDN8ZW58MHx8MHx8fDA%3D"),
                    ("tesla-model3-2.jpg", "https://images.unsplash.com/photo-1585011664466-b7bbe92f34ef?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
                ),

                // Yamaha R1 (motorcycle photos)
                CreateAnnouncement(
                    "Yamaha R1 2021", "Yamaha", "R1", VehicleType.Motorcycle, "Blue", 19000, 8000,
                    ("yamaha-r1-1.jpg", "https://images.unsplash.com/photo-1660648128024-cdd5f8930df6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
                )
            };

            context.Announcements.AddRange(announcements);
            await context.SaveChangesAsync();
        }
    }
}

