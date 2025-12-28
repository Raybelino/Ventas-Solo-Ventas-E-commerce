using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Back_End.Migrations
{
    /// <inheritdoc />
    public partial class updateUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Provincia",
                table: "AspNetUsers",
                newName: "Street");

            migrationBuilder.RenameColumn(
                name: "Nombre",
                table: "AspNetUsers",
                newName: "Province");

            migrationBuilder.RenameColumn(
                name: "Municipio",
                table: "AspNetUsers",
                newName: "Postal_Code");

            migrationBuilder.RenameColumn(
                name: "CodigoPostal",
                table: "AspNetUsers",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Calle",
                table: "AspNetUsers",
                newName: "Municipality");

            migrationBuilder.RenameColumn(
                name: "Apellido",
                table: "AspNetUsers",
                newName: "Lastname");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Street",
                table: "AspNetUsers",
                newName: "Provincia");

            migrationBuilder.RenameColumn(
                name: "Province",
                table: "AspNetUsers",
                newName: "Nombre");

            migrationBuilder.RenameColumn(
                name: "Postal_Code",
                table: "AspNetUsers",
                newName: "Municipio");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "AspNetUsers",
                newName: "CodigoPostal");

            migrationBuilder.RenameColumn(
                name: "Municipality",
                table: "AspNetUsers",
                newName: "Calle");

            migrationBuilder.RenameColumn(
                name: "Lastname",
                table: "AspNetUsers",
                newName: "Apellido");
        }
    }
}
