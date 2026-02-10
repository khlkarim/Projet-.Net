using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Interfaces
{
    public interface IReviewRepository
    {
        Task<Review> CreateAsync(Review review);
        Task<Review> GetByIdAsync(Guid id);
        Task<List<Review>> GetAllAsync();
        Task<List<Review>> GetAllByUserIdAsync(string userId);
        Task<List<Review>> GetAllByAnnouncementIdAsync(Guid announcementId);
        Task<Review> UpdateAsync(Review review);
        Task<bool> DeleteAsync(Guid id);
    }
}
