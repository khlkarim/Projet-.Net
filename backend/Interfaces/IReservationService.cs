using VehiclePlatform.API.DTOs;

namespace VehiclePlatform.API.Interfaces
{
    public interface IReservationService
    {
        Task<ReservationResponseDto> CreateAsync(CreateReservationDto reservationDto, string userId);
        Task<List<ReservationResponseDto>> GetAllAsync();
        Task<ReservationResponseDto> GetByIdAsync(Guid id);
        Task<List<ReservationResponseDto>> GetAllByUserIdAsync(string userId);
        Task<List<ReservationResponseDto>> GetAllByAnnouncementIdAsync(Guid announcementId);
        Task<ReservationResponseDto> UpdateAsync(Guid id, UpdateReservationDto reservationDto, string userId);
        Task<ReservationResponseDto> DeleteAsync(Guid id, string userId); 
    }
}

