/// <summary>
/// Interfaz para el repositorio de reseñas, que define métodos para la gestión de reseñas de productos.
/// </summary>

using Back_End.Domain.Entities;

namespace Back_End.Domain.Interfaces
{
    public interface IReviewRepository
    {
        /// <summary>
        /// Verifica si un producto existe en el sistema por su identificador único.
        /// </summary>
        /// <param name="productId">
        /// Parametro de tipo entero que representa el identificador único del producto a verificar.
        /// </param>
        /// <returns>
        /// Un valor booleano que indica si el producto existe (true) o no (false).
        /// </returns>
        Task<bool> ProductExistsAsync(int productId);

        /// <summary>
        /// Agrega una nueva reseña para un producto.
        /// </summary>
        /// <param name="review">
        /// Objeto de tipo <see cref="Review"/> que contiene la información de la reseña a agregar.
        /// </param>
        /// <returns>
        /// Una tarea que representa la operación asincrónica.
        /// </returns>
        Task AddReviewAsync(Review review);

        /// <summary>
        /// Obtiene todas las reseñas asociadas a un producto específico.
        /// </summary>
        /// <param name="productId">
        /// Parametro de tipo entero que representa el identificador único del producto cuyas reseñas se desean obtener.
        /// </param>
        /// <returns>
        /// Una lista de objetos <see cref="Review"/> que representan las reseñas del producto.
        /// </returns>
        Task<List<Review>> GetReviewsByProductAsync(int productId);

        /// <summary>
        /// Obtiene una reseña por su identificador único.
        /// </summary>
        /// <param name="reviewId">
        /// Parametro de tipo entero que representa el identificador único de la reseña a buscar.
        /// </param>
        /// <returns>
        /// Un objeto <see cref="Review"/> si se encuentra una reseña con el ID proporcionado;
        /// </returns>
        Task<Review?> GetByIdAsync(int reviewId);

        /// <summary>
        /// Elimina una reseña existente.
        /// </summary>
        /// <param name="review">
        /// Objeto de tipo <see cref="Review"/> que contiene la información de la reseña a eliminar.
        /// </param>
        /// <returns>
        /// Un valor booleano que indica si la eliminación fue exitosa (true) o no (false).
        /// </returns>
        Task<bool> DeleteAsync(Review review);
    }
}