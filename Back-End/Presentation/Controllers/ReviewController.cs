/// <summary>
/// Controlador para gestionar las reseñas de productos.
/// </summary>

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Back_End.Application.DTO;
using Back_End.Application.Services.Interfaces;

namespace Back_End.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;
        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        /// <summary>
        /// Crea una nueva reseña para un producto.
        /// </summary>
        /// <param name="dto">
        /// El DTO que contiene la información de la reseña a crear.
        /// </param>
        /// <returns>
        /// Devuelve NoContent (204) si se creo bien, en caso contrario, devuelve NotFound (404)
        /// </returns>

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateReview([FromBody] CreateReviewDto dto)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("Usuario no autorizado.");
                }

                var result = await _reviewService.AddReviewAsync(dto, userId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Elimina una reseña por su ID.
        /// </summary>
        /// <param name="reviewId">
        /// Parametro de tipo entero que representa el identificador único de la reseña a eliminar.
        /// </param>
        /// <returns>
        /// Devuelve NoContent (204) si se elimino bien, en caso contrario, devuelve NotFound (404)
        /// </returns>

        [Authorize]
        [HttpDelete("{reviewId}")]
        public async Task<IActionResult> DeleteReview(int reviewId)
        {
            try
            {
                var deleted = await _reviewService.DeleteReviewAsync(reviewId);
                return deleted ? NoContent() : NotFound();
            }

            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Obtiene todas las reseñas de un producto específico por su ID.
        /// </summary>
        /// <param name="productId">
        /// Parametro de tipo entero que representa el identificador único del producto cuyas reseñas se desean obtener.
        /// </param>
        /// <returns>
        /// Una lista de todas las reseñas del producto en el sistema.
        /// </returns>

        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetReviewsByProduct(int productId)
        {
            try
            {
                var reviews = await _reviewService.GetByProductIdAsync(productId);
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }
    }
}