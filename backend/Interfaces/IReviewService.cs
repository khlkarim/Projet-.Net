using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.DTOs;

namespace VehiclePlatform.API.Interfaces
{
    public interface IReviewService
    {
        Task<Review> CreateReviewAsync(ReviewDto reviewDto);
        Task<List<Review>> GetReviewsByAnnouncementAsync(Guid announcementId);
        Task<List<Review>> GetReviewsBySellerAsync(Guid sellerId);
        Task<Review> UpdateReviewAsync(Guid id, ReviewDto reviewDto);
        Task<bool> DeleteReviewAsync(Guid id);
        Task<bool> MarkReviewAsHelpfulAsync(Guid id);
        Task<decimal> GetAverageRatingAsync(Guid targetId); // Target could be Announcement or Seller
        Task<bool> SyncToNoSQLAsync(Guid reviewId);
    }
}
