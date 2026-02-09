using System;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.DTOs;

namespace VehiclePlatform.API.Interfaces
{
    public interface IVehicleService
    {
        Task<Vehicle> CreateVehicleAsync(VehicleDto vehicleDto);
        Task<Vehicle> GetVehicleByIdAsync(Guid id);
        Task<Vehicle> UpdateVehicleAsync(Guid id, VehicleDto vehicleDto);
        Task<bool> DeleteVehicleAsync(Guid id);
        Task<bool> ValidateVINAsync(string vin);
    }
}
