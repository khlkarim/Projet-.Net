using VehiclePlatform.API.DTOs;

namespace VehiclePlatform.API.Interfaces
{
    public interface INotificationService
    {
        Task<NotificationResponseDto> CreateAsync(CreateNotificationDto notificationDto);
        Task<List<NotificationResponseDto>> GetAllAsync();
        Task<NotificationResponseDto> GetByIdAsync(Guid id);
        Task<List<NotificationResponseDto>> GetAllByUserIdAsync(string userId);
        Task<NotificationResponseDto> UpdateAsync(Guid id, UpdateNotificationDto notificationDto);
        Task<NotificationResponseDto> DeleteAsync(Guid id);
    }
}
