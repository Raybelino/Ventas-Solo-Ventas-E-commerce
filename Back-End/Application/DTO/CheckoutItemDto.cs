/// <summary>
/// El DTO para un artículo en el proceso de pago.
/// </summary>

namespace Back_End.Application.DTO
{
    public class CheckoutItemDto
    {
        /// <summary>
        /// El nombre del producto.
        /// </summary>
        public string ProductName { get; set; } = "";

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