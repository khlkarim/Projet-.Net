using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Services
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IAnnouncementRepository _announcementRepository;
        private readonly IWebHostEnvironment _env;

        public AnnouncementService(IAnnouncementRepository announcementRepository, IWebHostEnvironment env)
        {
            _announcementRepository = announcementRepository;
            _env = env;
        }

        // Create announcement and return DTO
        public async Task<AnnouncementResponseDto> CreateAnnouncementAsync(AnnouncementDto dto, string userId)
        {
            var announcement = new Announcement
            {
                Id = Guid.NewGuid(),
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
                ApplicationUserId = userId
            };

            // Handle files
            if (dto.Files != null && dto.Files.Any())
            {
                var uploadFolder = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads");
                Directory.CreateDirectory(uploadFolder);

                foreach (var file in dto.Files)
                {
                    var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
                    var filePath = Path.Combine(uploadFolder, uniqueFileName);

                    using var stream = System.IO.File.Create(filePath);
                    await file.CopyToAsync(stream);

                    announcement.Files.Add(new AnnouncementFile
                    {
                        FileName = file.FileName,
                        FilePath = $"/uploads/{uniqueFileName}",
                        Size = file.Length,
                        ContentType = file.ContentType
                    });
                }
            }

            var created = await _announcementRepository.AddAsync(announcement);
            return MapToDto(created);
        }

        public async Task<AnnouncementResponseDto> GetAnnouncementByIdAsync(Guid id)
        {
            var announcement = await _announcementRepository.GetByIdAsync(id);
            return announcement == null ? null : MapToDto(announcement);
        }

        public async Task<List<AnnouncementResponseDto>> GetAnnouncementsAsync()
        {
            var announcements = await _announcementRepository.GetAsync();
            return announcements.Select(MapToDto).ToList();
        }

        public async Task<AnnouncementResponseDto> UpdateAnnouncementAsync(Guid id, AnnouncementDto dto, string userId)
        {
            var announcement = await _announcementRepository.GetByIdAsync(id);
            if (announcement == null) return null;

            if (announcement.ApplicationUserId != userId)
                throw new UnauthorizedAccessException("You are not the owner of this announcement.");

            announcement.Title = dto.Title;
            announcement.Description = dto.Description;
            announcement.Mileage = dto.Mileage;
            announcement.Price = dto.Price;
            announcement.AnnouncementType = dto.AnnouncementType;
            announcement.Brand = dto.Brand;
            announcement.Model = dto.Model;
            announcement.VehicleType = dto.VehicleType;
            announcement.FuelType = dto.FuelType;
            announcement.Transmission = dto.Transmission;
            announcement.Color = dto.Color;

            // Handle new uploaded files
            if (dto.Files != null && dto.Files.Any())
            {
                var uploadFolder = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads");
                Directory.CreateDirectory(uploadFolder);

                foreach (var file in dto.Files)
                {
                    var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
                    var filePath = Path.Combine(uploadFolder, uniqueFileName);

                    using var stream = System.IO.File.Create(filePath);
                    await file.CopyToAsync(stream);

                    announcement.Files.Add(new AnnouncementFile
                    {
                        FileName = file.FileName,
                        FilePath = $"/uploads/{uniqueFileName}",
                        Size = file.Length,
                        ContentType = file.ContentType
                    });
                }
            }

            var updated = await _announcementRepository.UpdateAsync(announcement);
            return MapToDto(updated);
        }

        public async Task<bool> DeleteAnnouncementAsync(Guid id, string userId)
        {
            var announcement = await _announcementRepository.GetByIdAsync(id);
            if (announcement == null) return false;

            if (announcement.ApplicationUserId != userId)
                throw new UnauthorizedAccessException("You are not the owner");

            // Delete files from disk
            if (announcement.Files != null && announcement.Files.Any())
            {
                foreach (var file in announcement.Files)
                {
                    var fullPath = Path.Combine(_env.WebRootPath ?? "wwwroot", file.FilePath.TrimStart('/'));
                    if (System.IO.File.Exists(fullPath))
                        System.IO.File.Delete(fullPath);
                }
            }

            return await _announcementRepository.DeleteAsync(id);
        }

        // Helper: maps entity to DTO to avoid circular references
        private AnnouncementResponseDto MapToDto(Announcement entity)
        {
            return new AnnouncementResponseDto
            {
                Id = entity.Id,
                Title = entity.Title,
                Description = entity.Description,
                Mileage = entity.Mileage,
                Price = entity.Price,
                AnnouncementType = entity.AnnouncementType,
                Brand = entity.Brand,
                Model = entity.Model,
                VehicleType = entity.VehicleType,
                FuelType = entity.FuelType,
                Transmission = entity.Transmission,
                Color = entity.Color,
                Files = entity.Files.Select(f => new AnnouncementFileDto
                {
                    FileName = f.FileName,
                    FilePath = f.FilePath
                }).ToList()
            };
        }
    }
}

