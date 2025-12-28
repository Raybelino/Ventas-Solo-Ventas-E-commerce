/// <summary>
/// Interfaz para el servicio de notificaciones.
/// </summary>

using Back_End.Domain.Entities;

namespace Back_End.Application.Services.Interfaces
{
    public interface INotificationService
    {
        /// <summary>
        /// Agrega una nueva notificación.
        /// </summary>
        /// <param name="notification">
        /// La notificación a agregar.
        /// </param>
        /// <returns>
        /// Una tarea que representa la operación asincrónica.
        /// </returns>
        Task AddNotificationAsync(Notification notification);

        /// <summary>
        /// Obtiene las notificaciones de un usuario específico.
        /// </summary>
        /// <param name="userId">
        /// El ID del usuario cuyas notificaciones se desean obtener.
        /// </param>
        /// <returns>
        /// Una lista de notificaciones del usuario.
        /// </returns>
        Task<List<Notification>> GetNotificationsByUserAsync(string userId);

        /// <summary>
        /// Marca una notificación como leída.
        /// </summary>
        /// <param name="notificationId">
        /// El ID de la notificación a marcar como leída.
        /// </param>
        /// <returns>
        /// Una tarea que representa la operación asincrónica.
        /// </returns>
        Task MarkNotificationAsReadAsync(int notificationId);
    }
}