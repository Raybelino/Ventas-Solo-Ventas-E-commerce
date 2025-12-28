/// <summary>
/// Representación de un producto en el sistema.
/// </summary>

namespace Back_End.Domain.Entities
{
    public class Product
    {
        /// <summary>
        /// Identificador único del producto.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre del producto.
        /// </summary>
        public string Name { get; set; } = "";

        /// <summary>
        /// Descripción del producto.
        /// </summary>
        public string Description { get; set; } = "";

        /// <summary>
        /// Precio del producto.
        /// </summary>
        public decimal Price { get; set; }

        /// <summary>
        /// Cantidad disponible en stock del producto.
        /// </summary>
        public int Stock { get; set; }

        /// <summary>
        /// Ruta de la imagen del producto.
        /// </summary>
        public string? ImagePath { get; set; }

        /// <summary>
        /// Categoría del producto.
        /// </summary>
        public string Category { get; set; } = "Otros";
    }
}