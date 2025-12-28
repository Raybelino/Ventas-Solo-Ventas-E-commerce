/// <summary>
/// El DTO para la configuración de JWT.
/// </summary>

namespace Back_End.Application.DTO
{
    public class JwtSettingsDTO
    {
        /// <summary>
        /// La clave secreta utilizada para firmar el token JWT.
        /// </summary>
        public string Key { get; set; } = null!;

        /// <summary>
        /// El emisor del token JWT.
        /// </summary>
        public string Issuer { get; set; } = null!;

        /// <summary>
        /// El público al que va dirigido el token JWT.
        /// </summary>
        public string Audience { get; set; } = null!;

        /// <summary>
        /// El tiempo de expiración del token JWT en minutos. Por defecto es 1440 minutos (24 horas).
        /// </summary>
        public int ExpirationMinutes { get; set; } = 1440;
    }
}