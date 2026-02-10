using VehiclePlatform.API.DTOs;

namespace VehiclePlatform.API.Interfaces
{
    public interface IAnnouncementService
    {
        Task<AnnouncementResponseDto> CreateAsync(CreateAnnouncementDto announcementDto, string userId);
        Task<List<AnnouncementResponseDto>> GetAllAsync();
        Task<List<AnnouncementResponseDto>> GetAllByUserIdAsync(string userId);
        Task<AnnouncementResponseDto> GetByIdAsync(Guid id);
        Task<AnnouncementResponseDto> UpdateAsync(Guid id, UpdateAnnouncementDto announcementDto, string userId);
        Task<bool> DeleteAsync(Guid id, string userId);
    }
}
