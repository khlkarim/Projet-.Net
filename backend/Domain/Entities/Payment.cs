using System;
using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.Domain.Entities
{
    public class Payment
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid? ReservationId { get; set; }
        public Guid? AnnouncementId { get; set; }
        public decimal Amount { get; set; }
        public PaymentMethod Method { get; set; }
        public PaymentStatus Status { get; set; }
        public string TransactionId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ProcessedAt { get; set; }

        public void Process()
        {
            Status = PaymentStatus.Completed;
            ProcessedAt = DateTime.UtcNow;
        }

        public void Refund()
        {
            Status = PaymentStatus.Refunded;
        }
    }
}
