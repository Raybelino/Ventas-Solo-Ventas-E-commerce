/// <summary>
/// Implementación del servicio de reseñas, que maneja la lógica de negocio relacionada con las reseñas de productos.
/// </summary>

using Microsoft.AspNetCore.Identity;
using Back_End.Application.DTO;
using Back_End.Application.Services.Interfaces;
using Back_End.Domain.Entities;
using Back_End.Domain.Interfaces;

namespace Back_End.Application.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IReviewRepository _reviewRepository;
        public ReviewService(IReviewRepository reviewRepository, UserManager<ApplicationUser> userManager)
        {
            _reviewRepository = reviewRepository;
        }

        /// <inheritdoc/>
        public async Task<Review> AddReviewAsync(CreateReviewDto dto, string userId)
        {
            if (!await _reviewRepository.ProductExistsAsync(dto.ProductId))
                throw new ArgumentException("Producto no encontrado.");

            if (dto.Rating < 1 || dto.Rating > 5)
                throw new ArgumentException("Rating debe estar entre 1 y 5.");

            var review = new Review
            {
                ProductId = dto.ProductId,
                UserId = userId,
                Rating = dto.Rating,
                Comment = dto.Comment,
                CreatedAt = DateTime.UtcNow
            };

            await _reviewRepository.AddReviewAsync(review);

            return review;
        }

        /// <inheritdoc/>
        public async Task<List<ReviewDto>> GetByProductIdAsync(int productId)
        {
            var comments = await _reviewRepository.GetReviewsByProductAsync(productId);

            // Mapear a DTOs
            var commentDtos = comments.Select(c => new ReviewDto
            {
                ReviewId = c.ReviewId,
                UserId = c.UserId,
                Rating = c.Rating,
                Comment = c.Comment,
                Username = c.User?.Name?.Split(" ")[0] + " " + c.User?.Lastname?.Split(" ")[0],
                CreatedAt = c.CreatedAt.ToString("yyyy-MM-dd HH:mm:ss")
            }).ToList();

            return commentDtos;
        }

        /// <inheritdoc/>
        public async Task<bool> DeleteReviewAsync(int reviewId)
        {
            var review = await _reviewRepository.GetByIdAsync(reviewId);

            if (review == null)
                return false;

            return await _reviewRepository.DeleteAsync(review);
        }
    }
}