using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationsController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservation(ReservationDto dto)
        {
            var reservation = await _reservationService.CreateReservationAsync(dto);
            return Ok(reservation);
        }

        [HttpPost("{id}/confirm")]
        public async Task<IActionResult> ConfirmHelper(Guid id)
        {
            var result = await _reservationService.ConfirmReservationAsync(id);
            if (!result) return NotFound();
            return Ok();
        }
    }
}
