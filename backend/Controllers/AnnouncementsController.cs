using Microsoft.AspNetCore.Mvc;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace VehiclePlatform.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class AnnouncementsController : ControllerBase
    {
        private readonly IAnnouncementService _announcementService;

        public AnnouncementsController(IAnnouncementService announcementService)
        {
            _announcementService = announcementService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAnnouncement([FromForm] AnnouncementDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var announcement = await _announcementService.CreateAnnouncementAsync(dto, userId);
            return Ok(announcement);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAnnouncement(Guid id)
        {
            var announcement = await _announcementService.GetAnnouncementByIdAsync(id);
            if (announcement == null) return NotFound();
            return Ok(announcement);
        }

        [HttpGet()]
        public async Task<IActionResult> GetAnnouncements()
        {
            var results = await _announcementService.GetAnnouncementsAsync();
            return Ok(results);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAnnouncement(Guid id, [FromForm] AnnouncementDto announcementDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _announcementService.UpdateAnnouncementAsync(id, announcementDto, userId);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result  = await _announcementService.DeleteAnnouncementAsync(id, userId);

            if (!result) return BadRequest("Could not update announcement.");
            return Ok();
        }
    }
}
