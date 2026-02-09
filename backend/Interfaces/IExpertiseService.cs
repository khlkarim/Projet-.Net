using System;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.DTOs;

namespace VehiclePlatform.API.Interfaces
{
    public interface IExpertiseService
    {
        Task<TechnicalExpertise> ScheduleExpertiseAsync(Guid vehicleId, Guid expertId);
        Task<TechnicalExpertise> PerformExpertiseAsync(Guid expertiseId, ExpertiseDto expertiseDto);
        Task<TechnicalExpertise> GetExpertiseByIdAsync(Guid id);
        Task<bool> ApproveExpertiseAsync(Guid id);
        Task<string> GenerateReportAsync(Guid id);
    }
}
