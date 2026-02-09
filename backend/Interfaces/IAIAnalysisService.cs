using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Interfaces
{
    public interface IAIAnalysisService
    {
        // Simple return types for now as SentimentResult/Prediction aren't defined in detail
        Task<string> AnalyzeReviewSentimentAsync(string text);
        Task<List<Review>> DetectFraudulentReviewsAsync(Guid reviewId);
        Task<List<Announcement>> GenerateRecommendationsAsync(Guid userId);
        Task<decimal> PredictVehiclePriceAsync(Vehicle vehicle);
    }
}
