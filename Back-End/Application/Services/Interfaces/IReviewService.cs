/// <summary>
/// Interfaz para el servicio de reseñas.
/// </summary>

using Back_End.Application.DTO;
using Back_End.Domain.Entities;

namespace Back_End.Application.Services.Interfaces
{
    public interface IReviewService
    {
        /// <summary>
        /// Obtiene todas las reseñas de un producto por su ID.
        /// </summary>
        /// <param name="productId">
        /// El ID del producto cuyas reseñas se desean obtener.
        /// </param>
        /// <returns>
        /// Una lista de reseñas del producto.
        /// </returns>
        Task<List<ReviewDto>> GetByProductIdAsync(int productId);

        /// <summary>
        /// Agrega una nueva reseña.
        /// </summary>
        /// <param name="dto">
        /// El DTO que contiene la información de la reseña a agregar.
        /// </param>
        /// <param name="userId">
        /// El ID del usuario que agrega la reseña.
        /// </param>
        /// <returns>
        /// La reseña creada.
        /// </returns>
        Task<Review> AddReviewAsync(CreateReviewDto dto, string userId);

        /// <summary>
        /// Elimina una reseña por su ID.
        /// </summary>
        /// <param name="reviewId">
        /// El ID de la reseña a eliminar.
        /// </param>
        /// <returns>
        /// true si la eliminación fue exitosa; de lo contrario, false.
        /// </returns>
        Task<bool> DeleteReviewAsync(int reviewId);
    }
}