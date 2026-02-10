using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Interfaces
{
    public interface IAnnouncementService
    {
        Task<AnnouncementResponseDto> CreateAnnouncementAsync(AnnouncementDto announcementDto, string userId);
        Task<AnnouncementResponseDto> GetAnnouncementByIdAsync(Guid id);
        Task<List<AnnouncementResponseDto>> GetAnnouncementsAsync();
        Task<AnnouncementResponseDto> UpdateAnnouncementAsync(Guid id, AnnouncementDto announcementDto, string userId);
        Task<bool> DeleteAnnouncementAsync(Guid id, string userId);
    }
}
