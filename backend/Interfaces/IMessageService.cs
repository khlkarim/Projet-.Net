using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.DTOs;

namespace VehiclePlatform.API.Interfaces
{
    public interface IMessageService
    {
        Task<Message> SendMessageAsync(MessageDto messageDto);
        Task<List<Message>> GetConversationAsync(Guid user1Id, Guid user2Id);
        Task<bool> MarkAsReadAsync(Guid messageId);
        Task<int> GetUnreadCountAsync(Guid userId);
    }
}
