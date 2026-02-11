using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;
using Microsoft.AspNetCore.Authorization;

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

        // POST: api/Reservations
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateReservationDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var created = await _reservationService.CreateAsync(dto, userId);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // GET: api/Reservations
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reservations = await _reservationService.GetAllAsync();
            return Ok(reservations);
        }

        // GET: api/Reservations/{id}
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var reservation = await _reservationService.GetByIdAsync(id);
            if (reservation == null)
                return NotFound(new { Message = "Reservation not found." });

            return Ok(reservation);
        }

        // GET: api/Reservations/user
        [HttpGet("user")]
        [Authorize]
        public async Task<IActionResult> GetAllForCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var reservations = await _reservationService.GetAllByUserIdAsync(userId);
            return Ok(reservations);
        }

        // GET: api/Reservations/announcement/{announcementId}
        [HttpGet("announcement/{announcementId:guid}")]
        public async Task<IActionResult> GetAllByAnnouncement(Guid announcementId)
        {
            var reservations = await _reservationService.GetAllByAnnouncementIdAsync(announcementId);
            return Ok(reservations);
        }

        // PUT: api/Reservations/{id}
        [HttpPut("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateReservationDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            try
            {
                var updated = await _reservationService.UpdateAsync(id, dto, userId);
                return Ok(updated);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { Message = "Reservation not found." });
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid();
            }
        }

        // DELETE: api/Reservations/{id}
        [HttpDelete("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            try
            {
                var deleted = await _reservationService.DeleteAsync(id, userId);
                if (deleted == null)
                    return NotFound(new { Message = "Reservation not found." });

                return NoContent();
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid();
            }
        }
    }
}

