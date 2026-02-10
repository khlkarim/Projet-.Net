using Microsoft.AspNetCore.Mvc;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehiclesController : ControllerBase
    {
        private readonly IVehicleService _vehicleService;

        public VehiclesController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle(VehicleDto vehicleDto)
        {
            var vehicle = await _vehicleService.CreateVehicleAsync(vehicleDto);
            return Ok(vehicle);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(Guid id)
        {
            var vehicle = await _vehicleService.GetVehicleByIdAsync(id);
            if (vehicle == null) return NotFound();
            return Ok(vehicle);
        }

        [HttpGet()]
        public async Task<IActionResult> GetVehicles()
        {
            return Ok(await _vehicleService.GetVehiclesAsync());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(Guid id, VehicleDto vehicleDto)
        {
            var vehicle = await _vehicleService.UpdateVehicleAsync(id, vehicleDto);
            if (vehicle == null) return NotFound();
            return Ok(vehicle);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(Guid id)
        {
            var result = await _vehicleService.DeleteVehicleAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
