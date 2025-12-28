/// <summary>
/// El DTO para crear una nueva reseña.
/// </summary>

namespace Back_End.Application.DTO
{
    public class CreateReviewDto
    {
        /// <summary>
        /// El ID del producto al que se le está haciendo la reseña.
        /// </summary>
        public int ProductId { get; set; }

        /// <summary>
        /// El ID del usuario que está haciendo la reseña.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// La calificación de la reseña (por ejemplo, de 1 a 5).
        /// </summary>
        public int Rating { get; set; }

        /// <summary>
        /// El comentario de la reseña.
        /// </summary>
        public string? Comment { get; set; }
    }
}