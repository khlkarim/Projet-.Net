using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Services
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IAnnouncementRepository _repository;

        public AnnouncementService(IAnnouncementRepository repository)
        {
            _repository = repository;
        }

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
                Files = dto.Files?.Select(MapFile).ToList() ?? new List<AnnouncementFile>()
            };

            var created = await _repository.CreateAsync(announcement);
            return MapToResponse(created);
        }

        public async Task<List<AnnouncementResponseDto>> GetAllAsync()
        {
            var announcements = await _repository.GetAllAsync();
            return announcements.Select(MapToResponse).ToList();
        }

        public async Task<List<AnnouncementResponseDto>> GetAllByUserIdAsync(string userId)
        {
            var announcements = await _repository.GetAllByUserIdAsync(userId);
            return announcements.Select(MapToResponse).ToList();
        }

        public async Task<AnnouncementResponseDto> GetByIdAsync(Guid id)
        {
            var announcement = await _repository.GetByIdAsync(id);
            if (announcement == null)
                throw new KeyNotFoundException("Announcement not found.");
            return MapToResponse(announcement);
        }

        public async Task<AnnouncementResponseDto> UpdateAsync(Guid id, UpdateAnnouncementDto dto, string userId)
        {
            var announcement = await _repository.GetByIdAsync(id);
            if (announcement == null)
                throw new KeyNotFoundException("Announcement not found.");

            if (announcement.ApplicationUserId != userId)
                throw new UnauthorizedAccessException("You are not allowed to update this announcement.");

            // Update fields if provided
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

            // Add new files if any
            if (dto.Files != null && dto.Files.Any())
            {
                announcement.Files.AddRange(dto.Files.Select(MapFile));
            }

            var updated = await _repository.UpdateAsync(announcement);
            return MapToResponse(updated);
        }

        public async Task<bool> DeleteAsync(Guid id, string userId)
        {
            var announcement = await _repository.GetByIdAsync(id);
            if (announcement == null)
                return false;

            if (announcement.ApplicationUserId != userId)
                throw new UnauthorizedAccessException("You are not allowed to delete this announcement.");

            return await _repository.DeleteAsync(id);
        }

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

        private static AnnouncementFile MapFile(IFormFile file)
        {
            // You can expand this to save the file to disk or cloud storage
            return new AnnouncementFile
            {
                FileName = file.FileName,
                FilePath = $"uploads/{file.FileName}", // placeholder path
                Size = file.Length,
                ContentType = file.ContentType
            };
        }
    }
}

