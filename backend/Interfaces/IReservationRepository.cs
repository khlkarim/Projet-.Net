using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Interfaces
{
    public interface IReservationRepository
    {
        Task<Reservation> CreateAsync(Reservation reservation);
        Task<Reservation> GetByIdAsync(Guid id);
        Task<List<Reservation>> GetAllAsync();
        Task<List<Reservation>> GetAllByUserIdAsync(string userId);
        Task<List<Reservation>> GetAllByAnnouncementIdAsync(Guid announcementId);
        Task<Reservation> UpdateAsync(Reservation reservation);
        Task<bool> DeleteAsync(Guid id);
    }
}
