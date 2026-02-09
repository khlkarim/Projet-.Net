using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Interfaces
{
    public interface ISearchService
    {
        Task<List<Announcement>> SearchAsync(SearchFilter filter);
        Task<List<string>> GetSuggestionsAsync(string query);
        Task<List<string>> GetPopularSearchesAsync();
        Task<bool> IndexAnnouncementAsync(Announcement announcement);
    }
}
