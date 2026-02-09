using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            var user = await _userService.RegisterAsync(userDto);
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(string email, string password)
        {
            var token = await _userService.LoginAsync(email, password);
            if (token == null) return Unauthorized();
            return Ok(new { Token = token });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, UserDto userDto)
        {
            var user = await _userService.UpdateUserAsync(id, userDto);
            if (user == null) return NotFound();
            return Ok(user);
        }
    }
}
