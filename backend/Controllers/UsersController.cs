using VehiclePlatform.API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using VehiclePlatform.API.Domain.Entities;

namespace VehiclePlatform.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IWebHostEnvironment _env;

        private const string ProfileUploadFolder = "uploads/profiles";

        public UsersController(
            UserManager<ApplicationUser> userManager,
            IWebHostEnvironment env)
        {
            _userManager = userManager;
            _env = env;
        }

        /* ============================
         * GET: api/users
         * ============================ */
        [HttpGet]
        public async Task<ActionResult<List<ApplicationUserResponseDto>>> GetUsers()
        {
            var users = await _userManager.Users
                .AsNoTracking()
                .Select(u => new ApplicationUserResponseDto
                {
                    Id = u.Id,
                    UserName = u.UserName!,
                    Email = u.Email!,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    ProfilePicture = u.ProfilePicture
                })
                .ToListAsync();

            return Ok(users);
        }

        /* ============================
         * GET: api/users/{id}
         * ============================ */
        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUserResponseDto>> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();

            return Ok(ToDto(user));
        }

        /* ============================
         * PATCH: api/users/{id}
         * ============================ */
        [HttpPatch("{id}")]
        [Authorize]
        public async Task<ActionResult<ApplicationUserResponseDto>> UpdateUser(
            string id,
            [FromForm] UpdateApplicationUserDto dto)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();

            // Prevent users from editing others (unless admin logic added later)
            var currentUserId = _userManager.GetUserId(User);
            if (currentUserId != id)
                return Forbid();

            /* -------- Identity-safe updates -------- */

            if (dto.UserName != null && dto.UserName != user.UserName)
            {
                var result = await _userManager.SetUserNameAsync(user, dto.UserName);
                if (!result.Succeeded)
                    return BadRequest(result.Errors);
            }

            if (dto.Email != null && dto.Email != user.Email)
            {
                var result = await _userManager.SetEmailAsync(user, dto.Email);
                if (!result.Succeeded)
                    return BadRequest(result.Errors);
            }

            /* -------- Simple fields -------- */

            if (dto.FirstName != null) user.FirstName = dto.FirstName;
            if (dto.LastName != null) user.LastName = dto.LastName;

            /* -------- Profile picture -------- */

            if (dto.ProfilePicture != null)
            {
                var newPath = await SaveProfilePictureAsync(dto.ProfilePicture, user.ProfilePicture);
                user.ProfilePicture = newPath;
            }

            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
                return BadRequest(updateResult.Errors);

            return Ok(ToDto(user));
        }

        /* ============================
         * DELETE: api/users/{id}
         * ============================ */
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();

            var currentUserId = _userManager.GetUserId(User);
            if (currentUserId != id)
                return Forbid();

            DeleteProfilePicture(user.ProfilePicture);

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return NoContent();
        }

        /* ============================
         * Helpers
         * ============================ */
        private async Task<string> SaveProfilePictureAsync(
            IFormFile file,
            string? oldPath)
        {
            var root = Path.Combine(_env.WebRootPath ?? "wwwroot", ProfileUploadFolder);
            Directory.CreateDirectory(root);

            DeleteProfilePicture(oldPath);

            var safeFileName = Path.GetFileName(file.FileName);
            var uniqueName = $"{Guid.NewGuid()}_{safeFileName}";
            var fullPath = Path.Combine(root, uniqueName);

            using var stream = System.IO.File.Create(fullPath);
            await file.CopyToAsync(stream);

            return $"/{ProfileUploadFolder}/{uniqueName}";
        }

        private void DeleteProfilePicture(string? relativePath)
        {
            if (string.IsNullOrWhiteSpace(relativePath))
                return;

            var fullPath = Path.Combine(
                _env.WebRootPath ?? "wwwroot",
                relativePath.TrimStart('/'));

            if (System.IO.File.Exists(fullPath))
                System.IO.File.Delete(fullPath);
        }

        private static ApplicationUserResponseDto ToDto(ApplicationUser user)
        {
            return new ApplicationUserResponseDto
            {
                Id = user.Id,
                UserName = user.UserName!,
                Email = user.Email!,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePicture = user.ProfilePicture
            };
        }
    }
}

