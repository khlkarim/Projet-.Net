using Microsoft.AspNetCore.Mvc;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnnouncementsController : ControllerBase
    {
        private readonly IAnnouncementService _announcementService;

        public AnnouncementsController(IAnnouncementService announcementService)
        {
            _announcementService = announcementService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAnnouncement(AnnouncementDto dto)
        {
            var announcement = await _announcementService.CreateAnnouncementAsync(dto);
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
        public async Task<IActionResult> UpdateAnnouncement(Guid id, AnnouncementDto announcementDto)
        {
            var result = await _announcementService.UpdateAnnouncementAsync(id, announcementDto);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result  = await _announcementService.DeleteAnnouncementAsync(id);

            if (!result) return BadRequest("Could not update announcement.");
            return Ok();
        }
    }
}
