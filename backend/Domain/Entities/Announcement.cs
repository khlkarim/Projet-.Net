using System;
using System.Collections.Generic;
using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.Domain.Entities
{
    public class Announcement
    {
        public Guid Id { get; set; }
        public Guid VehicleId { get; set; }
        public Guid SellerId { get; set; }
        public AnnouncementType Type { get; set; }
        public decimal Price { get; set; }
        public decimal? RentalPricePerDay { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public AnnouncementStatus Status { get; set; }
        public DateTime PublishedAt { get; set; }
        public DateTime? ExpiresAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int ViewCount { get; set; }
        public bool IsFeatured { get; set; }
        public string Location { get; set; }
        public List<string> ImageUrls { get; set; } = new List<string>();

        public void Publish()
        {
            Status = AnnouncementStatus.Published;
            PublishedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }

        public void Unpublish()
        {
            Status = AnnouncementStatus.Draft; // Or Suspended/Expired depending on logic
            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdatePrice(decimal newPrice)
        {
            Price = newPrice;
            UpdatedAt = DateTime.UtcNow;
        }

        public void IncrementViewCount()
        {
            ViewCount++;
        }

        public void MarkAsSold()
        {
            Status = AnnouncementStatus.Sold;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
