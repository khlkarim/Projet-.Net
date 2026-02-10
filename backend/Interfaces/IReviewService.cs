using VehiclePlatform.API.DTOs;

namespace VehiclePlatform.API.Interfaces
{
    public interface IReviewService
    {
        Task<ReviewResponseDto> CreateAsync(CreateReviewDto reservationDto, string userId);
        Task<List<ReviewResponseDto>> GetAllAsync();
        Task<ReviewResponseDto> GetByIdAsync(Guid id);
        Task<List<ReviewResponseDto>> GetAllByUserIdAsync(string userId);
        Task<List<ReviewResponseDto>> GetAllByAnnouncementIdAsync(Guid announcementId);
        Task<ReviewResponseDto> UpdateAsync(Guid id, UpdateReviewDto reservationDto, string userId);
        Task<ReviewResponseDto> DeleteAsync(Guid id, string userId); 
    }
}
