/// <summary>
/// Representación de un usuario de la aplicación con propiedades adicionales.
/// </summary>

using Microsoft.AspNetCore.Identity;

namespace Back_End.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        /// <summary>
        /// Nombre del usuario.
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// Apellido del usuario.
        /// </summary>
        public string? Lastname { get; set; }

        /// <summary>
        /// Dirección del usuario.
        /// </summary>
        public string? Province { get; set; }

        /// <summary>
        /// Ciudad del usuario.
        /// </summary>
        public string? Municipality { get; set; }

        /// <summary>
        /// Código postal del usuario.
        /// </summary>
        public string? Postal_Code { get; set; }

        /// <summary>
        /// Calle del usuario.
        /// </summary>q   
        public string? Street { get; set; }
    }
}

