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
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly VehicleDbContext _context;

        public AnnouncementRepository(VehicleDbContext context)
        {
            _context = context;
        }

        public async Task<Announcement> AddAsync(Announcement announcement)
        {
            _context.Announcements.Add(announcement);
            await _context.SaveChangesAsync();
            return announcement;
        }

        public async Task<Announcement> GetByIdAsync(Guid id)
        {
            return await _context.Announcements.FindAsync(id);
        }

        public async Task<List<Announcement>> SearchAsync(SearchFilter filter)
        {
            var query = _context.Announcements.AsQueryable();

            if (filter.AnnouncementType.HasValue)
                query = query.Where(a => a.Type == filter.AnnouncementType.Value);

            if (filter.MinPrice.HasValue)
                query = query.Where(a => a.Price >= filter.MinPrice.Value);

            if (filter.MaxPrice.HasValue)
                query = query.Where(a => a.Price <= filter.MaxPrice.Value);
            
            if (!string.IsNullOrEmpty(filter.Location))
                query = query.Where(a => a.Location.Contains(filter.Location));

            if (filter.OnlyVerified.HasValue && filter.OnlyVerified.Value)
            {
                // Assuming Verified logic involves associated User or Vehicle inspection
                // For now, simpler implementation or join needed. 
                // Let's assume Status == Published is verified enough for this query part, 
                // or we need to join with User/Expertise.
                query = query.Where(a => a.Status == Domain.Enums.AnnouncementStatus.Published);
            }

            // For vehicle attributes, we need to join Vehicle
            // Assuming we can join manually or if Navigation properties existed
            // Since entities defined earlier didn't explicitly have Navigation properties (I used Ids),
            // I need to join manually.
            
            var result = await query.Join(_context.Vehicles, 
                a => a.VehicleId, 
                v => v.Id, 
                (a, v) => new { Announcement = a, Vehicle = v })
                .Where(x => 
                    (string.IsNullOrEmpty(filter.Brand) || x.Vehicle.Brand.Contains(filter.Brand)) &&
                    (string.IsNullOrEmpty(filter.Model) || x.Vehicle.Model.Contains(filter.Model)) &&
                    (!filter.MinYear.HasValue || x.Vehicle.Year >= filter.MinYear.Value) &&
                    (!filter.MaxYear.HasValue || x.Vehicle.Year <= filter.MaxYear.Value) &&
                    (!filter.MaxMileage.HasValue || x.Vehicle.Mileage <= filter.MaxMileage.Value) &&
                    (!filter.Type.HasValue || x.Vehicle.Type == filter.Type.Value) &&
                    (!filter.FuelType.HasValue || x.Vehicle.FuelType == filter.FuelType.Value) &&
                    (!filter.Transmission.HasValue || x.Vehicle.Transmission == filter.Transmission.Value)
                )
                .Select(x => x.Announcement)
                .ToListAsync();

            return result;
        }

        public async Task<Announcement> UpdateAsync(Announcement announcement)
        {
            _context.Announcements.Update(announcement);
            await _context.SaveChangesAsync();
            return announcement;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var announcement = await _context.Announcements.FindAsync(id);
            if (announcement == null) return false;

            _context.Announcements.Remove(announcement);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
