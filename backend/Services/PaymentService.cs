using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VehiclePlatform.API.Domain.Entities;
using VehiclePlatform.API.Domain.Enums;
using VehiclePlatform.API.DTOs;
using VehiclePlatform.API.Infrastructure.Data;
using VehiclePlatform.API.Interfaces;

namespace VehiclePlatform.API.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly VehicleDbContext _context;
        private readonly INotificationService _notificationService;

        public PaymentService(VehicleDbContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        public async Task<Payment> ProcessPaymentAsync(PaymentDto dto)
        {
            // Simulate processing
            var payment = new Payment
            {
                Id = Guid.NewGuid(),
                UserId = dto.UserId,
                ReservationId = dto.ReservationId,
                AnnouncementId = dto.AnnouncementId,
                Amount = dto.Amount,
                Method = dto.Method,
                Status = PaymentStatus.Pending,
                CreatedAt = DateTime.UtcNow
            };

            // Simulate external payment gateway success
            payment.Process();
            payment.TransactionId = $"TRX-{Guid.NewGuid()}";

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            // Notify user
            await _notificationService.SendNotificationAsync(new NotificationDto
            {
                UserId = dto.UserId,
                Type = NotificationType.PaymentReceived,
                Title = "Payment Successful",
                Message = $"Payment of {dto.Amount} processed successfully.",
                ActionUrl = "/payments" // Frontend URL
            });

            return payment;
        }

        public async Task<Payment> GetPaymentByIdAsync(Guid id)
        {
            return await _context.Payments.FindAsync(id);
        }

        public async Task<bool> RefundPaymentAsync(Guid id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null) return false;

            payment.Refund();
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Payment>> GetUserPaymentsAsync(Guid userId)
        {
            return await _context.Payments.ToListAsync(); // Filter by user logically
        }
    }
}
