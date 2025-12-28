/// <summary>
/// Interfaz para el servicio de autenticación.
/// </summary>

using Back_End.Application.DTO;
using Back_End.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Back_End.Application.Services.Interfaces
{
    public interface IAuthService
    {
        /// <summary>
        /// Genera un token JWT para el usuario autenticado.
        /// </summary>
        /// <param name="user">
        /// El usuario para el cual se genera el token.
        /// </param>
        /// <returns>
        /// El token JWT como una cadena.
        /// </returns>
        Task<string> GenerateJwtTokenAsync(ApplicationUser user);

        /// <summary>
        /// Registra un nuevo usuario en el sistema.
        /// </summary>
        /// <param name="request">
        /// El DTO que contiene la información del usuario a registrar.
        /// </param>
        /// <returns>
        /// El resultado de la operación de registro.
        /// </returns>
        Task<IdentityResult> RegisterUser(RegisterUserDto request);

        /// <summary>
        /// Valida las credenciales del usuario y obtiene el usuario correspondiente.
        /// </summary>
        /// <param name="request">
        /// El DTO que contiene las credenciales del usuario a validar.
        /// </param>
        /// <returns>
        /// El usuario si las credenciales son válidas; de lo contrario, null.
        /// </returns>
        Task<ApplicationUser?> ValidateUserAndGetUser(LoginUserDto request);

        /// <summary>
        /// Obtiene el rol del usuario.
        /// </summary>
        /// <param name="user">
        /// El usuario del cual se desea obtener el rol.
        /// </param>
        /// <returns>
        /// El rol del usuario como una cadena; null si el usuario no tiene rol.
        /// </returns>
        Task<string?> GetUserRole(ApplicationUser user);

        /// <summary>
        /// Actualiza el perfil del usuario.
        /// </summary>
        /// <param name="userId">
        /// El ID del usuario cuyo perfil se va a actualizar.
        /// </param>
        /// <param name="dto">
        /// El DTO que contiene la información actualizada del usuario.
        /// </param>
        /// <returns>
        /// true si la actualización fue exitosa; de lo contrario, false.
        /// </returns>
        Task<bool> UpdateUserProfile(string userId, UpdateUserDto dto);

        /// <summary>
        /// Obtiene un usuario por su ID.
        /// </summary>
        /// <param name="userId">
        /// El ID del usuario a obtener.
        /// </param>
        /// <returns>
        /// El usuario si se encuentra; de lo contrario, null.
        /// </returns>
        Task<ApplicationUser?> GetUserByIdAsync(string userId);
    }
}