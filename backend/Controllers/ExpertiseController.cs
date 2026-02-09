using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpertiseController : ControllerBase
    {
        private readonly IExpertiseService _expertiseService;

        public ExpertiseController(IExpertiseService expertiseService)
        {
            _expertiseService = expertiseService;
        }

        [HttpPost("schedule")]
        public async Task<IActionResult> Schedule(Guid vehicleId, Guid expertId)
        {
            var expertise = await _expertiseService.ScheduleExpertiseAsync(vehicleId, expertId);
            return Ok(expertise);
        }

        [HttpPost("{id}/perform")]
        public async Task<IActionResult> Perform(Guid id, [FromBody] ExpertiseDto dto)
        {
            var expertise = await _expertiseService.PerformExpertiseAsync(id, dto);
            if (expertise == null) return NotFound();
            return Ok(expertise);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExpertise(Guid id)
        {
            var expertise = await _expertiseService.GetExpertiseByIdAsync(id);
            if (expertise == null) return NotFound();
            return Ok(expertise);
        }
    }
}
