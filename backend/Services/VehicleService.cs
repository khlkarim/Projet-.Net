using System;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.Domain.Enums;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _vehicleRepository;

        public VehicleService(IVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public async Task<Vehicle> CreateVehicleAsync(VehicleDto vehicleDto)
        {
            var vehicle = new Vehicle
            {
                Id = Guid.NewGuid(),
                VIN = vehicleDto.VIN,
                Brand = vehicleDto.Brand,
                Model = vehicleDto.Model,
                Year = vehicleDto.Year,
                Type = vehicleDto.Type,
                FuelType = vehicleDto.FuelType,
                Transmission = vehicleDto.Transmission,
                Mileage = vehicleDto.Mileage,
                Color = vehicleDto.Color,
                Description = vehicleDto.Description,
                Condition = VehicleCondition.Good, // Default
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            return await _vehicleRepository.AddAsync(vehicle);
        }

        public async Task<Vehicle> GetVehicleByIdAsync(Guid id)
        {
            return await _vehicleRepository.GetByIdAsync(id);
        }

        public async Task<Vehicle> UpdateVehicleAsync(Guid id, VehicleDto vehicleDto)
        {
            var vehicle = await _vehicleRepository.GetByIdAsync(id);
            if (vehicle == null) return null;

            vehicle.Mileage = vehicleDto.Mileage;
            vehicle.Description = vehicleDto.Description;
            vehicle.UpdatedAt = DateTime.UtcNow;

            return await _vehicleRepository.UpdateAsync(vehicle);
        }

        public async Task<bool> DeleteVehicleAsync(Guid id)
        {
            return await _vehicleRepository.DeleteAsync(id);
        }

        public async Task<bool> ValidateVINAsync(string vin)
        {
            // Simple validation: length check or similar
            if (string.IsNullOrWhiteSpace(vin) || vin.Length != 17) return false;
            
            // Check if exists
            var existing = await _vehicleRepository.GetByVINAsync(vin);
            return existing == null; // Valid if not duplicate (or maybe valid if exists? Logic depends on context)
        }
    }
}
