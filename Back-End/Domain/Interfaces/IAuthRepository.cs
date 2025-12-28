/// <summary>
/// Interfaz para el repositorio de autenticación, que define métodos para el registro y manejo de usuarios,
/// </summary>

using Back_End.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Back_End.Domain.Interfaces
{
    public interface IAuthRepository
    {
        /// <summary>
        /// Registra un nuevo usuario en el sistema con la contraseña proporcionada.
        /// </summary>
        /// <param name="user">
        /// Objeto <see cref="ApplicationUser"/> que contiene la información del usuario a registrar.
        /// </param>
        /// <param name="password">
        /// Contraseña en texto plano que será validada y almacenada de forma segura (en hash).
        /// </param>
        /// <returns>
        /// Un objeto <see cref="IdentityResult"/> que indica si el registro fue exitoso o contiene
        /// los errores de validación en caso contrario.
        /// </returns>
        Task<IdentityResult> RegisterAsync(ApplicationUser user, string password);

        /// <summary>
        /// Verifica si la contraseña proporcionada coincide con la del usuario.
        /// </summary>
        /// <param name="user">
        /// Objeto <see cref="ApplicationUser"/> que representa al usuario cuyo password se va a verificar.
        /// </param>
        /// <param name="password">
        /// Contraseña en texto plano que se va a comparar con la almacenada para el usuario.
        /// </param>
        /// <returns>
        /// Un valor booleano que indica si la contraseña es correcta (true) o no (false).
        /// </returns>
        Task<bool> CheckPasswordAsync(ApplicationUser user, string password);

        /// <summary>
        /// Busca un usuario por su correo electrónico.
        /// </summary>
        /// <param name="email">
        /// El correo electrónico del usuario a buscar.
        /// </param>
        /// <returns>
        /// Un objeto <see cref="ApplicationUser"/> si se encuentra un usuario con el correo proporcionado;
        /// </returns>
        Task<ApplicationUser?> FindByEmailAsync(string email);

        /// <summary>
        /// Obtiene los roles asignados a un usuario.
        /// </summary>
        /// <param name="user">
        /// Objeto <see cref="ApplicationUser"/> que representa al usuario cuyos roles se van a obtener.
        /// </param>
        /// <returns>
        /// Una lista de cadenas que representan los nombres de los roles asignados al usuario.
        /// </returns>
        Task<IList<string>> GetUserRolesAsync(ApplicationUser user);

        /// <summary>
        /// Asigna un rol a un usuario.
        /// </summary>
        /// <param name="user">
        /// Objeto <see cref="ApplicationUser"/> que representa al usuario al que se le va a asignar el rol.
        /// </param>
        /// <param name="role">
        /// Rol en forma de cadena que se va a asignar al usuario.
        /// </param>
        /// <returns>
        /// Un objeto <see cref="IdentityResult"/> que indica si la asignación del rol fue exitosa o contiene
        /// </returns>
        Task<IdentityResult> AssignRoleToUserAsync(ApplicationUser user, string role);

        /// <summary>
        /// Busca un usuario por su ID.
        /// </summary>
        /// <param name="id">
        /// Un valor de cadena que representa el ID único del usuario a buscar.
        /// </param>
        /// <returns>
        /// Un objeto <see cref="ApplicationUser"/> si se encuentra un usuario con el ID proporcionado;
        /// </returns>
        Task<ApplicationUser?> GetByIdAsync(string id);

        /// <summary>
        /// Actualiza la información del usuario.
        /// </summary>
        /// <param name="user">
        /// Objeto <see cref="ApplicationUser"/> que contiene la información actualizada del usuario.
        /// </param>
        /// <returns>
        /// Un valor booleano que indica si la actualización fue exitosa (true) o no (false).
        /// </returns>
        Task<bool> UpdateAsync(ApplicationUser user);
    }
}
