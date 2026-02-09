using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;

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

        [HttpPost("search")]
        public async Task<IActionResult> Search([FromBody] SearchFilter filter)
        {
            var results = await _announcementService.SearchAnnouncementsAsync(filter);
            return Ok(results);
        }

        [HttpPut("{id}/publish")]
        public async Task<IActionResult> Publish(Guid id)
        {
            var result = await _announcementService.PublishAnnouncementAsync(id);
            if (!result) return BadRequest("Could not publish announcement.");
            return Ok();
        }
    }
}
