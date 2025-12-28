/// <summary>
/// Controlador para gestionar las notificaciones de los usuarios.
/// </summary>

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Back_End.Domain.Interfaces;

namespace Back_End.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationRepository _notificationRepository;
        public NotificationsController(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        /// <summary>
        /// Obtiene las notificaciones de un usuario específico.
        /// </summary>
        /// <param name="userId">
        /// Parametro de tipo cadena que representa el identificador único del usuario cuyas notificaciones se desean obtener.
        /// </param>
        /// <returns>
        /// Una lista de objetos <see cref="Notification"/> que representan las notificaciones del usuario.
        /// </returns>

        [Authorize]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetByUser(string userId)
        {
            try
            {
                var notifications = await _notificationRepository.GetByUserAsync(userId);
                return Ok(notifications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Marca una notificación como leída.
        /// </summary>
        /// <param name="id">
        /// Parametro de tipo entero que representa el identificador único de la notificación a marcar como leída.
        /// </param>
        /// <returns>
        /// Una tarea que representa la operación asincrónica.
        /// </returns>

        [Authorize]
        [HttpPut("{id}/mark-as-read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            try
            {
                await _notificationRepository.MarkAsReadAsync(id);
                return Ok(new { message = "Notificación marcada como leída" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }
    }
}