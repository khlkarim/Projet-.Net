using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehiclePlatform.API.Migrations
{
    /// <inheritdoc />
    public partial class FixAnnouncementAttributes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropColumn(
                name: "ExpiresAt",
                table: "Announcements");

            migrationBuilder.DropColumn(
                name: "IsFeatured",
                table: "Announcements");

            migrationBuilder.DropColumn(
                name: "PublishedAt",
                table: "Announcements");

            migrationBuilder.DropColumn(
                name: "RentalPricePerDay",
                table: "Announcements");

            migrationBuilder.DropColumn(
                name: "SellerId",
                table: "Announcements");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Announcements");

            migrationBuilder.DropColumn(
                name: "VehicleId",
                table: "Announcements");

            migrationBuilder.RenameColumn(
                name: "ViewCount",
                table: "Announcements",
                newName: "VehicleType");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Announcements",
                newName: "Transmission");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Announcements",
                newName: "Mileage");

            migrationBuilder.RenameColumn(
                name: "Location",
                table: "Announcements",
                newName: "Model");

            migrationBuilder.AddColumn<int>(
                name: "AnnouncementType",
                table: "Announcements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Brand",
                table: "Announcements",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Announcements",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "FuelType",
                table: "Announcements",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnnouncementType",
                table: "Announcements");

            migrationBuilder.DropColumn(
                name: "Brand",
                table: "Announcements");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "Announcements");

            migrationBuilder.DropColumn(
                name: "FuelType",
                table: "Announcements");

            migrationBuilder.RenameColumn(
                name: "VehicleType",
                table: "Announcements",
                newName: "ViewCount");

            migrationBuilder.RenameColumn(
                name: "Transmission",
                table: "Announcements",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "Model",
                table: "Announcements",
                newName: "Location");

            migrationBuilder.RenameColumn(
                name: "Mileage",
                table: "Announcements",
                newName: "Status");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpiresAt",
                table: "Announcements",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsFeatured",
                table: "Announcements",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "PublishedAt",
                table: "Announcements",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "RentalPricePerDay",
                table: "Announcements",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "SellerId",
                table: "Announcements",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Announcements",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "VehicleId",
                table: "Announcements",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsVerified = table.Column<bool>(type: "bit", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfileImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }
    }
}
