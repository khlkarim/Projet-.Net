using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.Domain.Enums;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Services
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IAnnouncementRepository _announcementRepository;

        public AnnouncementService(IAnnouncementRepository announcementRepository)
        {
            _announcementRepository = announcementRepository;
        }

        public async Task<Announcement> CreateAnnouncementAsync(AnnouncementDto dto)
        {
            var announcement = new Announcement
            {
                Id = Guid.NewGuid(),
                VehicleId = dto.VehicleId,
                Type = dto.Type,
                Price = dto.Price,
                RentalPricePerDay = dto.RentalPricePerDay,
                Title = dto.Title,
                Description = dto.Description,
                Location = dto.Location,
                ImageUrls = dto.ImageUrls,
                Status = AnnouncementStatus.Draft,
                ViewCount = 0,
                IsFeatured = false,
                UpdatedAt = DateTime.UtcNow
            };

            return await _announcementRepository.AddAsync(announcement);
        }

        public async Task<Announcement> GetAnnouncementByIdAsync(Guid id)
        {
            return await _announcementRepository.GetByIdAsync(id);
        }

        public async Task<List<Announcement>> GetAnnouncementsAsync()
        {
            return await _announcementRepository.GetAsync();
        }

        public async Task<Announcement> UpdateAnnouncementAsync(Guid id, AnnouncementDto dto)
        {
            var announcement = await _announcementRepository.GetByIdAsync(id);
            if (announcement == null) return null;

            announcement.Title = dto.Title;
            announcement.Description = dto.Description;
            announcement.Price = dto.Price;
            announcement.UpdatedAt = DateTime.UtcNow;

            return await _announcementRepository.UpdateAsync(announcement);
        }

        public async Task<bool> PublishAnnouncementAsync(Guid id)
        {
            var announcement = await _announcementRepository.GetByIdAsync(id);
            if (announcement == null) return false;

            announcement.Publish();
            await _announcementRepository.UpdateAsync(announcement);
            return true;
        }

        public async Task<bool> DeleteAnnouncementAsync(Guid id)
        {
            return await _announcementRepository.DeleteAsync(id);
        }
    }
}
