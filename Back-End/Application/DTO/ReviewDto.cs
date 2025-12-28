/// <summary>
/// El DTO para una reseña.
/// </summary>

namespace Back_End.Application.DTO
{
    public class ReviewDto
    {
        /// <summary>
        /// El ID de la reseña.
        /// </summary>
        public int ReviewId { get; set; }

        /// <summary>
        /// El ID del usuario que realizo la reseña.
        /// </summary>
        public string? UserId { get; set; }

        /// <summary>
        /// La calificación de la reseña (por ejemplo, de 1 a 5).
        /// </summary>
        public int Rating { get; set; }

        /// <summary>
        /// El comentario de la reseña.
        /// </summary>
        public string? Comment { get; set; }

        /// <summary>
        /// El nombre de usuario del revisor.
        /// </summary>
        public string? Username { get; set; }

        /// <summary>
        /// La fecha de creación de la reseña.
        /// </summary>
        public string? CreatedAt { get; set; }
    }
}