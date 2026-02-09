using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.Infrastructure.Data;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Infrastructure.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly VehicleDbContext _context;

        public ReviewRepository(VehicleDbContext context)
        {
            _context = context;
        }

        public async Task<Review> AddAsync(Review review)
        {
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
            return review;
        }

        public async Task<Review> GetByIdAsync(Guid id)
        {
            return await _context.Reviews.FindAsync(id);
        }

        public async Task<List<Review>> GetByAnnouncementIdAsync(Guid announcementId)
        {
            return await _context.Reviews
                .Where(r => r.AnnouncementId == announcementId)
                .ToListAsync();
        }

        public async Task<List<Review>> GetBySellerIdAsync(Guid sellerId)
        {
            return await _context.Reviews
                .Where(r => r.SellerId == sellerId)
                .ToListAsync();
        }

        public async Task<Review> UpdateAsync(Review review)
        {
            _context.Reviews.Update(review);
            await _context.SaveChangesAsync();
            return review;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null) return false;

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
