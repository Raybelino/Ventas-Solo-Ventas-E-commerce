/// <summary>
/// Repositorio para la gestión de productos en la base de datos.
/// </summary>

using Microsoft.EntityFrameworkCore;
using Back_End.Domain.Entities;
using Back_End.Domain.Interfaces;
using Back_End.Infrastructure.Data;

namespace Back_End.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;
        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<Product>> GetAllAsync() =>
            await _context.Products.ToListAsync();

        /// <inheritdoc/>
        public async Task<Product?> GetByIdAsync(int id) =>
            await _context.Products.FindAsync(id);

        /// <inheritdoc/>
        public async Task<Product> CreateAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        /// <inheritdoc/>
        public async Task UpdateAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }

        /// <inheritdoc/>
        public async Task DeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }
    }
}