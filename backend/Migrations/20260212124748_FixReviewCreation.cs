using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehiclePlatform.API.Migrations
{
    /// <inheritdoc />
    public partial class FixReviewCreation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Reviews_ApplicationUserId_AnnouncementId",
                table: "Reviews");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ApplicationUserId_AnnouncementId",
                table: "Reviews",
                columns: new[] { "ApplicationUserId", "AnnouncementId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Reviews_ApplicationUserId_AnnouncementId",
                table: "Reviews");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ApplicationUserId_AnnouncementId",
                table: "Reviews",
                columns: new[] { "ApplicationUserId", "AnnouncementId" },
                unique: true);
        }
    }
}
