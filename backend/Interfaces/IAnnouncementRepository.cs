using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Interfaces
{
    public interface IAnnouncementRepository
    {
        Task<Announcement> CreateAsync(Announcement announcement);
        Task<Announcement> GetByIdAsync(Guid id);
        Task<List<Announcement>> GetAllAsync();
        Task<List<Announcement>> GetAllByUserIdAsync(string userId);
        Task<Announcement> UpdateAsync(Announcement announcement);
        Task<bool> DeleteAsync(Guid id);
    }
}
