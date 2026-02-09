using System;
using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.DTOs
{
    public class PaymentDto
    {
        public Guid UserId { get; set; }
        public Guid? ReservationId { get; set; }
        public Guid? AnnouncementId { get; set; }
        public decimal Amount { get; set; }
        public PaymentMethod Method { get; set; }
    }
}
