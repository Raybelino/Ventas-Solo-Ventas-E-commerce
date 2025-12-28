/// <summary>
/// Representación de un ítem dentro de una orden.
/// </summary>

using System.Text.Json.Serialization;

namespace Back_End.Domain.Entities
{
    public class OrderItem
    {
        /// <summary>
        /// Identificador único del ítem en la orden.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Identificador del producto.
        /// </summary>
        public int ProductId { get; set; }

        /// <summary>
        /// Nombre del producto.
        /// </summary>
        public string? ProductName { get; set; }

        /// <summary>
        /// Precio del producto.
        /// </summary>
        public decimal Price { get; set; }

        /// <summary>
        /// Cantidad del producto en la orden.
        /// </summary>
        public int Quantity { get; set; }

        /// <summary>
        /// Identificador de la orden a la que pertenece el ítem.
        /// </summary>
        public int OrderId { get; set; }

        /// <summary>
        /// Referencia a la orden a la que pertenece el ítem.
        /// </summary>
        [JsonIgnore]
        public Order? Order { get; set; }
    }
}