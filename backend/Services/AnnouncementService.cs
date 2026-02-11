using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Services
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IAnnouncementRepository _repository;
        private readonly IWebHostEnvironment _env;

        private const long MaxFileSize = 5 * 1024 * 1024; // 5MB
        private readonly string[] AllowedContentTypes =
        {
            "image/jpeg",
            "image/png",
            "image/webp"
        };

        public AnnouncementService(
            IAnnouncementRepository repository,
            IWebHostEnvironment env)
        {
            _repository = repository;
            _env = env;
        }

        // ===============================
        // CREATE
        // ===============================
        public async Task<AnnouncementResponseDto> CreateAsync(CreateAnnouncementDto dto, string userId)
        {
            var announcement = new Announcement
            {
                Title = dto.Title,
                Description = dto.Description,
                Mileage = dto.Mileage,
                Price = dto.Price,
                AnnouncementType = dto.AnnouncementType,
                Brand = dto.Brand,
                Model = dto.Model,
                VehicleType = dto.VehicleType,
                FuelType = dto.FuelType,
                Transmission = dto.Transmission,
                Color = dto.Color,
                ApplicationUserId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Files = new List<AnnouncementFile>()
            };

            if (dto.Files != null && dto.Files.Any())
            {
                foreach (var file in dto.Files)
                {
                    var savedFile = await SaveFileAsync(file);
                    announcement.Files.Add(savedFile);
                }
            }

            var created = await _repository.CreateAsync(announcement);
            return MapToResponse(created);
        }

        // ===============================
        // GET ALL
        // ===============================
        public async Task<List<AnnouncementResponseDto>> GetAllAsync()
        {
            var announcements = await _repository.GetAllAsync();
            return announcements.Select(MapToResponse).ToList();
        }

        // ===============================
        // GET BY USER
        // ===============================
        public async Task<List<AnnouncementResponseDto>> GetAllByUserIdAsync(string userId)
        {
            var announcements = await _repository.GetAllByUserIdAsync(userId);
            return announcements.Select(MapToResponse).ToList();
        }

        // ===============================
        // GET BY ID
        // ===============================
        public async Task<AnnouncementResponseDto> GetByIdAsync(Guid id)
        {
            var announcement = await _repository.GetByIdAsync(id);
            if (announcement == null)
                throw new KeyNotFoundException("Announcement not found.");

            return MapToResponse(announcement);
        }

        // ===============================
        // UPDATE
        // ===============================
        public async Task<AnnouncementResponseDto> UpdateAsync(Guid id, UpdateAnnouncementDto dto, string userId)
        {
            var announcement = await _repository.GetByIdAsync(id);
            if (announcement == null)
                throw new KeyNotFoundException("Announcement not found.");

            if (announcement.ApplicationUserId != userId)
                throw new UnauthorizedAccessException("You are not allowed to update this announcement.");

            announcement.Title = dto.Title ?? announcement.Title;
            announcement.Description = dto.Description ?? announcement.Description;
            announcement.Mileage = dto.Mileage ?? announcement.Mileage;
            announcement.Price = dto.Price ?? announcement.Price;
            announcement.AnnouncementType = dto.AnnouncementType ?? announcement.AnnouncementType;
            announcement.Brand = dto.Brand ?? announcement.Brand;
            announcement.Model = dto.Model ?? announcement.Model;
            announcement.VehicleType = dto.VehicleType ?? announcement.VehicleType;
            announcement.FuelType = dto.FuelType ?? announcement.FuelType;
            announcement.Transmission = dto.Transmission ?? announcement.Transmission;
            announcement.Color = dto.Color ?? announcement.Color;
            announcement.UpdatedAt = DateTime.UtcNow;

            if (dto.Files != null && dto.Files.Any())
            {
                foreach (var file in dto.Files)
                {
                    var savedFile = await SaveFileAsync(file);
                    announcement.Files.Add(savedFile);
                }
            }

            var updated = await _repository.UpdateAsync(announcement);
            return MapToResponse(updated);
        }

        // ===============================
        // DELETE
        // ===============================
        public async Task<bool> DeleteAsync(Guid id, string userId)
        {
            var announcement = await _repository.GetByIdAsync(id);
            if (announcement == null)
                return false;

            if (announcement.ApplicationUserId != userId)
                throw new UnauthorizedAccessException("You are not allowed to delete this announcement.");

            // Delete physical files
            foreach (var file in announcement.Files)
            {
                var physicalPath = Path.Combine(
                    _env.WebRootPath,
                    file.FilePath.TrimStart('/')
                );

                if (File.Exists(physicalPath))
                {
                    File.Delete(physicalPath);
                }
            }

            return await _repository.DeleteAsync(id);
        }

        // ===============================
        // FILE STORAGE
        // ===============================
        private async Task<AnnouncementFile> SaveFileAsync(IFormFile file)
        {
            if (!AllowedContentTypes.Contains(file.ContentType))
                throw new InvalidOperationException("Invalid file type.");

            if (file.Length > MaxFileSize)
                throw new InvalidOperationException("File exceeds maximum size (5MB).");

            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");

            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var physicalPath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(physicalPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return new AnnouncementFile
            {
                FileName = uniqueFileName,
                FilePath = $"/uploads/{uniqueFileName}",
                Size = file.Length,
                ContentType = file.ContentType
            };
        }

        // ===============================
        // MAPPING
        // ===============================
        private static AnnouncementResponseDto MapToResponse(Announcement announcement)
        {
            return new AnnouncementResponseDto
            {
                Id = announcement.Id,
                Title = announcement.Title,
                Description = announcement.Description,
                Mileage = announcement.Mileage,
                Price = announcement.Price,
                AnnouncementType = announcement.AnnouncementType,
                Brand = announcement.Brand,
                Model = announcement.Model,
                VehicleType = announcement.VehicleType,
                FuelType = announcement.FuelType,
                Transmission = announcement.Transmission,
                Color = announcement.Color,
                CreatedByUserId = announcement.ApplicationUserId,
                CreatedAt = announcement.CreatedAt,
                UpdatedAt = announcement.UpdatedAt,
                Files = announcement.Files.Select(f => new AnnouncementFileDto
                {
                    Id = f.Id,
                    FileName = f.FileName,
                    FilePath = f.FilePath,
                    Size = f.Size,
                    ContentType = f.ContentType
                }).ToList()
            };
        }
    }
}

