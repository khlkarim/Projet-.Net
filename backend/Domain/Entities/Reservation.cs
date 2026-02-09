using System;
using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.Domain.Entities
{
    public class Reservation
    {
        public Guid Id { get; set; }
        public Guid AnnouncementId { get; set; }
        public Guid UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ReservationStatus Status { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Notes { get; set; }

        public void CalculateTotalPrice(decimal pricePerDay)
        {
            var days = (EndDate - StartDate).Days;
            if (days > 0)
            {
                TotalPrice = days * pricePerDay;
            }
        }

        public void Confirm()
        {
            Status = ReservationStatus.Confirmed;
        }

        public void Cancel()
        {
            Status = ReservationStatus.Cancelled;
        }
    }
}
