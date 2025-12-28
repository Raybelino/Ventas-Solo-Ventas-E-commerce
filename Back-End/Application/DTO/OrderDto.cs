/// <summary>
/// El DTO para una orden.
/// </summary>

namespace Back_End.Application.DTO
{
    public class OrderDto
    {
        /// <summary>
        /// El ID de la orden.
        /// </summary>
        public string? UserId { get; set; }

        /// <summary>
        /// Lista de ítems en la orden.
        /// </summary>
        public List<OrderItemDto>? Items { get; set; }
    }
}