/// <summary>
/// Repositorio para la gestión de reseñas en la base de datos.
/// </summary> 

using Microsoft.EntityFrameworkCore;
using Back_End.Domain.Entities;
using Back_End.Domain.Interfaces;
using Back_End.Infrastructure.Data;

namespace Back_End.Infrastructure.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly AppDbContext _context;
        public ReviewRepository(AppDbContext context)
        {
            _context = context;
        }

        /// <inheritdoc/>
        public async Task<bool> ProductExistsAsync(int productId) =>
            await _context.Products.AnyAsync(p => p.Id == productId);

        /// <inheritdoc/>
        public async Task AddReviewAsync(Review review)
        {
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
        }

        /// <inheritdoc/>
        public async Task<List<Review>> GetReviewsByProductAsync(int productId) =>
            await _context.Reviews
                .Include(r => r.User)
                .Where(r => r.ProductId == productId)
                .ToListAsync();
        

        /// <inheritdoc/>
        public async Task<Review?> GetByIdAsync(int reviewId) => 
            await _context.Reviews
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.ReviewId == reviewId);

        /// <inheritdoc/>
        public async Task<bool> DeleteAsync(Review review)
        {
            _context.Reviews.Remove(review);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }
    }
}