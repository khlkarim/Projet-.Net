using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Interfaces
{
    public interface IReviewRepository
    {
        Task<Review> AddAsync(Review review);
        Task<Review> GetByIdAsync(Guid id);
        Task<List<Review>> GetByAnnouncementIdAsync(Guid announcementId);
        Task<List<Review>> GetBySellerIdAsync(Guid sellerId);
        Task<Review> UpdateAsync(Review review);
        Task<bool> DeleteAsync(Guid id);
    }
}
