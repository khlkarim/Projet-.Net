using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.DTOs;

namespace VehiclePlatform.API.Interfaces
{
    public interface IPaymentService
    {
        Task<Payment> ProcessPaymentAsync(PaymentDto paymentDto);
        Task<Payment> GetPaymentByIdAsync(Guid id);
        Task<bool> RefundPaymentAsync(Guid id);
        Task<List<Payment>> GetUserPaymentsAsync(Guid userId);
    }
}
