/// <summary>
/// El DTO para el registro de un usuario.
/// </summary> 

namespace Back_End.Application.DTO
{
    public class RegisterUserDto
    {
        /// <summary>
        /// El nombre del usuario.
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// El apellido del usuario.
        /// </summary>
        public string? Lastname { get; set; }

        /// <summary>
        /// El correo electrónico del usuario.
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// La contraseña del usuario.
        /// </summary>
        public string? Password { get; set; }

        /// <summary>
        /// El número de teléfono del usuario.
        /// </summary>
        public string? Phonenumber { get; set; }

        /// <summary>
        /// La provincia del usuario.
        /// </summary>
        public string? Province { get; set; }

        /// <summary>
        /// El municipio del usuario.
        /// </summary>
        public string? Municipality { get; set; }

        /// <summary>
        /// El código postal del usuario.
        /// </summary>
        public string? Postal_Code { get; set; }

        /// <summary>
        /// La calle del usuario.
        /// </summary>
        public string? Street { get; set; }
    }
}