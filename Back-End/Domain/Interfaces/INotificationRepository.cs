/// <summary>
/// Interfaz para el repositorio de notificaciones, que define métodos para la gestión de notificaciones de usuarios.
/// </summary>

using Back_End.Domain.Entities;

namespace Back_End.Domain.Interfaces
{
    public interface INotificationRepository
    {
        /// <summary>
        /// Agrega una nueva notificación para un usuario.
        /// </summary>
        /// <param name="notification">
        /// Objeto de tipo <see cref="Notification"/> que contiene la información de la notificación a agregar.
        /// </param>
        /// <returns>
        /// Una tarea que representa la operación asincrónica.
        /// </returns>
        Task AddAsync(Notification notification);

        /// <summary>
        /// Obtiene todas las notificaciones asociadas a un usuario específico.
        /// </summary>
        /// <param name="userId">
        /// Parametro de tipo cadena que representa el identificador único del usuario cuyas notificaciones se desean obtener.
        /// </param>
        /// <returns>
        /// Una lista de objetos <see cref="Notification"/> que representan las notificaciones del usuario.
        /// </returns>
        Task<List<Notification>> GetByUserAsync(string userId);

        /// <summary>
        /// Marca una notificación como leída.
        /// </summary>
        /// <param name="notificationId">
        /// Parametro de tipo entero que representa el identificador único de la notificación a marcar como leída.
        /// </param>
        /// <returns>
        /// Una tarea que representa la operación asincrónica.
        /// </returns>
        Task MarkAsReadAsync(int notificationId);
    }
}