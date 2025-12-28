/// <summary>
/// Representación de una orden en el sistema.
/// </summary>

namespace Back_End.Domain.Entities
{
    public class Order
    {
        /// <summary>
        /// Identificador único de la orden.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Identificador del usuario que realizó la orden.
        /// </summary>
        public string? UserId { get; set; }

        /// <summary>
        /// Fecha y hora en que se creó la orden.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Lista de ítems incluidos en la orden.
        /// </summary>
        public List<OrderItem>? Items { get; set; } = new List<OrderItem>();

        /// <summary>
        /// Estado de la orden (e.g., "Pendiente", "Completada", "Cancelada").
        /// </summary>
        public string Status { get; set; } = "Pendiente";
    }
}