/// <summary>
/// Servicio para la gestión de productos.
/// </summary>

using Back_End.Application.Services.Interfaces;
using Back_End.Domain.Entities;
using Back_End.Domain.Interfaces;

namespace Back_End.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<Product>> GetAllAsync() => await _repository.GetAllAsync();

        /// <inheritdoc/>
        public async Task<Product?> GetByIdAsync(int id) => await _repository.GetByIdAsync(id);

        /// <inheritdoc/>
        public async Task<Product> CreateAsync(Product product) => await _repository.CreateAsync(product);

        /// <inheritdoc/>
        public async Task UpdateAsync(Product product) => await _repository.UpdateAsync(product);

        /// <inheritdoc/>
        public async Task DeleteAsync(int id) => await _repository.DeleteAsync(id);
    }
}