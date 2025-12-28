/// <summary>
/// El DTO para un ítem de orden.
/// </summary>

namespace Back_End.Application.DTO
{
    public class OrderItemDto
    {
        /// <summary>
        /// El ID del producto.
        /// </summary>
        public int ProductId { get; set; }

        /// <summary>
        /// El nombre del producto.
        /// </summary>
        public string? ProductName { get; set; }

        /// <summary>
        /// El precio del producto.
        /// </summary>
        public decimal Price { get; set; }

        /// <summary>
        /// La cantidad del producto.
        /// </summary>
        public int Quantity { get; set; }
    }
}