/// <summary>
/// Representación de una reseña de producto realizada por un usuario.
/// </summary>

namespace Back_End.Domain.Entities
{
    public class Review
    {
        /// <summary>
        /// Identificador único de la reseña.
        /// </summary>
        public int ReviewId { get; set; }

        /// <summary>
        /// Identificador del producto al que pertenece la reseña.
        /// </summary>
        public int ProductId { get; set; }

        /// <summary>
        /// Referencia al producto al que pertenece la reseña.
        /// </summary>
        public Product? Product { get; set; }

        /// <summary>
        /// Identificador del usuario que realizó la reseña.
        /// </summary>
        public string? UserId { get; set; }

        /// <summary>
        /// Referencia al usuario que realizó la reseña.
        /// </summary>
        public ApplicationUser? User { get; set; }

        /// <summary>
        /// Calificación del producto (1 a 5).
        /// </summary>
        public int Rating { get; set; }

        /// <summary>
        /// Comentario adicional del usuario sobre el producto.
        /// </summary>
        public string? Comment { get; set; }

        /// <summary>
        /// Fecha y hora en que se creó la reseña.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}