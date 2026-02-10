using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.DTOs;

namespace VehiclePlatform.API.Interfaces
{
    public interface IAnnouncementService
    {
        Task<Announcement> CreateAnnouncementAsync(AnnouncementDto announcementDto);
        Task<Announcement> GetAnnouncementByIdAsync(Guid id);
        Task<List<Announcement>> GetAnnouncementsAsync();
        Task<Announcement> UpdateAnnouncementAsync(Guid id, AnnouncementDto announcementDto);
        Task<bool> PublishAnnouncementAsync(Guid id);
        Task<bool> DeleteAnnouncementAsync(Guid id);
    }
}
