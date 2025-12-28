/// <summary>
/// El DTO para actualizar la información de un usuario.
/// </summary>

namespace Back_End.Application.DTO
{
    public class UpdateUserDto
    {
        /// <summary>
        /// El nombre del usuario.
        /// </summary>
        public string? Nombre { get; set; }

        /// <summary>
        /// El apellido del usuario.
        /// </summary>
        public string? Apellido { get; set; }

        /// <summary>
        /// El numero de telefono del usuario.
        /// </summary>
        public string? Telefono { get; set; }

        /// <summary>
        /// La provincia del usuario.
        /// </summary>
        public string? Provincia { get; set; }

        /// <summary>
        /// El municipio del usuario.
        /// </summary>
        public string? Municipio { get; set; }

        /// <summary>
        /// El código postal del usuario.
        /// </summary>
        public string? CodigoPostal { get; set; }

        /// <summary>
        /// La calle del usuario.
        /// </summary>
        public string? Calle { get; set; }
    }
}