using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewsController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateReview(ReviewDto dto)
        {
            var review = await _reviewService.CreateReviewAsync(dto);
            return Ok(review);
        }

        [HttpGet("announcement/{id}")]
        public async Task<IActionResult> GetByAnnouncement(Guid id)
        {
            var reviews = await _reviewService.GetReviewsByAnnouncementAsync(id);
            return Ok(reviews);
        }

        [HttpGet("seller/{id}")]
        public async Task<IActionResult> GetBySeller(Guid id)
        {
            var reviews = await _reviewService.GetReviewsBySellerAsync(id);
            return Ok(reviews);
        }

        [HttpPost("{id}/helpful")]
        public async Task<IActionResult> MarkHelpful(Guid id)
        {
            var result = await _reviewService.MarkReviewAsHelpfulAsync(id);
            if (!result) return NotFound();
            return Ok();
        }
    }
}
