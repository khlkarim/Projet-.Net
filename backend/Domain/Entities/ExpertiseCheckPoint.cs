using System;
using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.Domain.Entities
{
    public class ExpertiseCheckPoint
    {
        public Guid Id { get; set; }
        public string Category { get; set; }
        public string Item { get; set; }
        public CheckPointStatus Status { get; set; }
        public string Notes { get; set; }
        public int Score { get; set; }
    }
}
