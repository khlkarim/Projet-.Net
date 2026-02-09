using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.DTOs;

namespace VehiclePlatform.API.Interfaces
{
    public interface IReservationService
    {
        Task<Reservation> CreateReservationAsync(ReservationDto reservationDto);
        Task<Reservation> GetReservationByIdAsync(Guid id);
        Task<bool> ConfirmReservationAsync(Guid id);
        Task<bool> CancelReservationAsync(Guid id);
        Task<List<Reservation>> GetUserReservationsAsync(Guid userId);
    }
}
