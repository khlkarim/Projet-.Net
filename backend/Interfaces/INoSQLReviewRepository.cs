using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VehiclePlatform.API.DTOs; // ReviewDocument is in DTOs

namespace VehiclePlatform.API.Interfaces
{
    public interface INoSQLReviewRepository
    {
        Task<bool> SaveReviewAsync(ReviewDocument review);
        Task<List<ReviewDocument>> GetReviewsByAnnouncementAsync(Guid announcementId);
        Task<List<ReviewDocument>> GetReviewsBySellerAsync(Guid sellerId);
        // Analysis methods
        // For simplicity returning object or Dictionary, diagram says specific types but I'll use object for now
        Task<object> AnalyzeReviewSentimentAsync(Guid entityId);
        Task<object> GetReviewTrendsAsync(Guid entityId);
    }
}
