using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IReviewRepository _repository;

        public ReviewService(IReviewRepository repository)
        {
            _repository = repository;
        }

        public async Task<ReviewResponseDto> CreateAsync(CreateReviewDto dto, string userId)
        {
            var review = new Review
            {
                Rating = dto.Rating,
                Title = dto.Title,
                Content = dto.Content,
                AnnouncementId = dto.AnnouncementId,
                ApplicationUserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            var created = await _repository.CreateAsync(review);
            return MapToResponse(created);
        }

        public async Task<List<ReviewResponseDto>> GetAllAsync()
        {
            var reviews = await _repository.GetAllAsync();
            return reviews.Select(MapToResponse).ToList();
        }

        public async Task<List<ReviewResponseDto>> GetAllByUserIdAsync(string userId)
        {
            var reviews = await _repository.GetAllByUserIdAsync(userId);
            return reviews.Select(MapToResponse).ToList();
        }

        public async Task<List<ReviewResponseDto>> GetAllByAnnouncementIdAsync(Guid announcementId)
        {
            var reviews = await _repository.GetAllByAnnouncementIdAsync(announcementId);
            return reviews.Select(MapToResponse).ToList();
        }

        public async Task<ReviewResponseDto> GetByIdAsync(Guid id)
        {
            var review = await _repository.GetByIdAsync(id);
            if (review == null)
                throw new KeyNotFoundException("Review not found.");
            return MapToResponse(review);
        }

        public async Task<ReviewResponseDto> UpdateAsync(Guid id, UpdateReviewDto dto, string userId)
        {
            var review = await _repository.GetByIdAsync(id);
            if (review == null)
                throw new KeyNotFoundException("Review not found.");

            // Only review creator can update
            if (review.ApplicationUserId != userId)
                throw new UnauthorizedAccessException("Only the creator can update this review.");

            review.Rating = dto.Rating ?? review.Rating;
            review.Title = dto.Title ?? review.Title;
            review.Content = dto.Content ?? review.Content;

            var updated = await _repository.UpdateAsync(review);
            return MapToResponse(updated);
        }

        public async Task<ReviewResponseDto> DeleteAsync(Guid id, string userId)
        {
            var review = await _repository.GetByIdAsync(id);
            if (review == null)
                throw new KeyNotFoundException("Review not found.");

            // Only review creator can delete
            if (review.ApplicationUserId != userId)
                throw new UnauthorizedAccessException("Only the creator can delete this review.");

            var deleted = await _repository.DeleteAsync(id);
            if (!deleted)
                throw new InvalidOperationException("Failed to delete review.");

            return MapToResponse(review);
        }

        private static ReviewResponseDto MapToResponse(Review review)
        {
            return new ReviewResponseDto
            {
                Id = review.Id,
                Rating = review.Rating,
                Title = review.Title,
                Content = review.Content,
                ApplicationUserId = review.ApplicationUserId,
                AnnouncementId = review.AnnouncementId,
                CreatedAt = review.CreatedAt
            };
        }
    }
}

