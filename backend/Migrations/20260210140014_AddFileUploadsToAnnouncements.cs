using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehiclePlatform.API.Migrations
{
    /// <inheritdoc />
    public partial class AddFileUploadsToAnnouncements : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrls",
                table: "Announcements");

            migrationBuilder.CreateTable(
                name: "AnnouncementFile",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Size = table.Column<long>(type: "bigint", nullable: false),
                    ContentType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AnnouncementId = table.Column<int>(type: "int", nullable: false),
                    AnnouncementId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnnouncementFile", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnnouncementFile_Announcements_AnnouncementId1",
                        column: x => x.AnnouncementId1,
                        principalTable: "Announcements",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnnouncementFile_AnnouncementId1",
                table: "AnnouncementFile",
                column: "AnnouncementId1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnnouncementFile");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrls",
                table: "Announcements",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
