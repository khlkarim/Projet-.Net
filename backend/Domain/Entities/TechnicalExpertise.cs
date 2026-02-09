using System;
using System.Collections.Generic;
using System.Linq; // Added for Sum
using VehiclePlatform.API.Domain.Enums;

namespace VehiclePlatform.API.Domain.Entities
{
    public class TechnicalExpertise
    {
        public Guid Id { get; set; }
        public Guid VehicleId { get; set; }
        public Guid ExpertId { get; set; }
        public Guid AnnouncementId { get; set; }
        public DateTime ExpertiseDate { get; set; }
        public ExpertiseStatus Status { get; set; }
        public decimal TotalScore { get; set; }
        public string GeneralComments { get; set; }
        public List<ExpertiseCheckPoint> CheckPoints { get; set; } = new List<ExpertiseCheckPoint>();
        public string ReportUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsApproved { get; set; }

        public void CalculateTotalScore()
        {
            if (CheckPoints != null && CheckPoints.Any())
            {
                TotalScore = CheckPoints.Sum(cp => cp.Score); // Simple sum logic
            }
        }

        public void GenerateReport()
        {
            // TODO: Logic to generate report (e.g. PDF) and set ReportUrl
        }

        public void Approve()
        {
            Status = ExpertiseStatus.Approved;
            IsApproved = true;
        }

        public void Reject()
        {
            Status = ExpertiseStatus.Rejected;
            IsApproved = false;
        }
    }
}
