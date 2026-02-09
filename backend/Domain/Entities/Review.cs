using System;
using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.Domain.Entities
{
    public class Review
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid? AnnouncementId { get; set; }
        public Guid? SellerId { get; set; }
        public ReviewType Type { get; set; }
        public int Rating { get; set; }
        public string Title { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsVerified { get; set; }
        public int HelpfulCount { get; set; }

        public void Validate()
        {
            if (Rating < 1 || Rating > 5)
            {
                throw new ArgumentException("Rating must be between 1 and 5.");
            }
        }

        public void MarkAsHelpful()
        {
            HelpfulCount++;
        }
    }
}
