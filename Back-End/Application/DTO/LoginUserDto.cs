/// <summary>
/// El DTO para el inicio de sesión de un usuario.
/// </summary>

namespace Back_End.Application.DTO
{
    public class LoginUserDto
    {
        /// <summary>
        /// El correo electrónico del usuario.
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// La contraseña del usuario.
        /// </summary>
        public string? Password { get; set; }
    }
}