using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Interfaces;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.Infrastructure.Data;

namespace VehiclePlatform.API.Infrastructure.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly VehicleDbContext _context;

        public ReviewRepository(VehicleDbContext context)
        {
            _context = context;
        }

        public async Task<Review> CreateAsync(Review review)
        {
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
            return review;
        }

        public async Task<Review> GetByIdAsync(Guid id)
        {
            return await _context.Reviews
                .Include(r => r.CreatedBy)
                .Include(r => r.Announcement)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<List<Review>> GetAllAsync()
        {
            return await _context.Reviews
                .Include(r => r.CreatedBy)
                .Include(r => r.Announcement)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Review>> GetAllByUserIdAsync(string userId)
        {
            return await _context.Reviews
                .Where(r => r.ApplicationUserId == userId)
                .Include(r => r.CreatedBy)
                .Include(r => r.Announcement)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Review>> GetAllByAnnouncementIdAsync(Guid announcementId)
        {
            return await _context.Reviews
                .Where(r => r.AnnouncementId == announcementId)
                .Include(r => r.CreatedBy)
                .Include(r => r.Announcement)
                .OrderByDescending(r => r.CreatedAt)
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

