using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Interfaces
{
    public interface IAnnouncementRepository
    {
        Task<Announcement> AddAsync(Announcement announcement);
        Task<Announcement> GetByIdAsync(Guid id);
        Task<List<Announcement>> GetAsync();
        Task<Announcement> UpdateAsync(Announcement announcement);
        Task<bool> DeleteAsync(Guid id);
    }
}
