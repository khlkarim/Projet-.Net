using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageService _messageService;

        public MessagesController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage(MessageDto dto)
        {
            var message = await _messageService.SendMessageAsync(dto);
            return Ok(message);
        }

        [HttpGet("conversation")]
        public async Task<IActionResult> GetConversation(Guid user1Id, Guid user2Id)
        {
            var messages = await _messageService.GetConversationAsync(user1Id, user2Id);
            return Ok(messages);
        }
    }
}
