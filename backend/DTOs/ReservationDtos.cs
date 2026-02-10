using VehiclePlatform.API.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace VehiclePlatform.API.DTOs
{
    public class CreateReservationDto
    {
        [Required]
        public Guid AnnouncementId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }
    }

    public class UpdateReservationDto
    {
        public ReservationStatus? Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public class ReservationResponseDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public Guid AnnouncementId { get; set; }

        [Required]
        public string ApplicationUserId { get; set; } = string.Empty;

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public ReservationStatus Status { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }
    }
}

