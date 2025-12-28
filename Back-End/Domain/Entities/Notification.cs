/// <summary>
/// Representación de una notificación en el sistema.
/// </summary>

namespace Back_End.Domain.Entities
{
    public class Notification
    {
        /// <summary>
        /// Identificador único de la notificación.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Identificador del usuario al que va dirigida la notificación.
        /// </summary>
        public string? UserId { get; set; }

        /// <summary>
        /// Mensaje de la notificación.
        /// </summary>
        public string Message { get; set; } = string.Empty;

        /// <summary>
        /// Fecha y hora en que se creó la notificación.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Indica si la notificación ha sido leída.
        /// </summary>
        public bool IsRead { get; set; } = false;
    }
}