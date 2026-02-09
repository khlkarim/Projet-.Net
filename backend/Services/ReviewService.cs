using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly INoSQLReviewRepository _noSqlRepository;

        public ReviewService(IReviewRepository reviewRepository, INoSQLReviewRepository noSqlRepository)
        {
            _reviewRepository = reviewRepository;
            _noSqlRepository = noSqlRepository;
        }

        public async Task<Review> CreateReviewAsync(ReviewDto dto)
        {
            var review = new Review
            {
                Id = Guid.NewGuid(),
                UserId = Guid.NewGuid(), // Should get from context in Controller
                AnnouncementId = dto.AnnouncementId,
                SellerId = dto.SellerId,
                Type = dto.Type,
                Rating = dto.Rating,
                Title = dto.Title,
                Comment = dto.Comment,
                CreatedAt = DateTime.UtcNow,
                IsVerified = false
            };
            
            review.Validate();
            
            var created = await _reviewRepository.AddAsync(review);
            
            // Sync to NoSQL
            await SyncToNoSQLAsync(created.Id);

            return created;
        }

        public async Task<List<Review>> GetReviewsByAnnouncementAsync(Guid announcementId)
        {
            return await _reviewRepository.GetByAnnouncementIdAsync(announcementId);
        }

        public async Task<List<Review>> GetReviewsBySellerAsync(Guid sellerId)
        {
            return await _reviewRepository.GetBySellerIdAsync(sellerId);
        }

        public async Task<Review> UpdateReviewAsync(Guid id, ReviewDto dto)
        {
            var review = await _reviewRepository.GetByIdAsync(id);
            if (review == null) return null;

            review.Rating = dto.Rating;
            review.Title = dto.Title;
            review.Comment = dto.Comment;
            review.UpdatedAt = DateTime.UtcNow;

            return await _reviewRepository.UpdateAsync(review);
        }

        public async Task<bool> DeleteReviewAsync(Guid id)
        {
            return await _reviewRepository.DeleteAsync(id);
        }

        public async Task<bool> MarkReviewAsHelpfulAsync(Guid id)
        {
            var review = await _reviewRepository.GetByIdAsync(id);
            if (review == null) return false;

            review.MarkAsHelpful();
            return (await _reviewRepository.UpdateAsync(review)) != null;
        }

        public async Task<decimal> GetAverageRatingAsync(Guid targetId)
        {
            // Simplified
            var reviews = await _reviewRepository.GetBySellerIdAsync(targetId); // or Announcement
            if (reviews.Count == 0) return 0;
            
            // Need to handle both Seller and Announcement reviews.
            // Assuming simplified logic:
            double sum = 0;
            foreach (var r in reviews) sum += r.Rating;
            return (decimal)(sum / reviews.Count);
        }

        public async Task<bool> SyncToNoSQLAsync(Guid reviewId)
        {
            var review = await _reviewRepository.GetByIdAsync(reviewId);
            if (review == null) return false;

            var doc = new ReviewDocument
            {
                Id = review.Id.ToString(),
                AnnouncementId = review.AnnouncementId ?? Guid.Empty,
                SellerId = review.SellerId ?? Guid.Empty,
                UserId = review.UserId,
                Rating = review.Rating,
                Comment = review.Comment,
                CreatedAt = review.CreatedAt
            };

            return await _noSqlRepository.SaveReviewAsync(doc);
        }
    }
}
