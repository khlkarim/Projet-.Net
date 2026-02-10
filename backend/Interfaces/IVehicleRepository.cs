using System;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Interfaces
{
    public interface IVehicleRepository
    {
        Task<Vehicle> AddAsync(Vehicle vehicle);
        Task<Vehicle> GetByIdAsync(Guid id);
        Task<List<Vehicle>> GetAsync();
        Task<Vehicle> GetByVINAsync(string vin);
        Task<Vehicle> UpdateAsync(Vehicle vehicle);
        Task<bool> DeleteAsync(Guid id);
    }
}
