using System;
using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.Domain.Entities
{
    public class Vehicle
    {
        public Guid Id { get; set; }
        public string VIN { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public VehicleType Type { get; set; }
        public FuelType FuelType { get; set; }
        public TransmissionType Transmission { get; set; }
        public int Mileage { get; set; }
        public string Color { get; set; }
        public int NumberOfSeats { get; set; }
        public int NumberOfDoors { get; set; }
        public int Power { get; set; }
        public string Description { get; set; }
        public VehicleCondition Condition { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid OwnerId { get; set; }

        public void CalculateDepreciation()
        {
            // TODO: Implement depreciation calculation logic
        }

        public void UpdateMileage(int newMileage)
        {
            if (newMileage > Mileage)
            {
                Mileage = newMileage;
                UpdatedAt = DateTime.UtcNow;
            }
        }
    }
}
