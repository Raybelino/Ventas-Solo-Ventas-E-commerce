/// <summary>
/// Interfaz para el servicio de productos.
/// </summary>

using Back_End.Domain.Entities;

namespace Back_End.Application.Services.Interfaces
{
    public interface IProductService
    {
        /// <summary>
        /// Obtiene todos los productos.
        /// </summary>
        /// <returns>
        /// Una lista de todos los productos en el sistema.
        /// </returns>
        Task<IEnumerable<Product>> GetAllAsync();

        /// <summary>
        /// Obtiene un producto por su ID.
        /// </summary>
        /// <param name="id">
        /// El ID del producto a obtener.
        /// </param>
        /// <returns>
        /// El producto si se encuentra; de lo contrario, null.
        /// </returns>
        Task<Product?> GetByIdAsync(int id);

        /// <summary>
        /// Crea un nuevo producto.
        /// </summary>
        /// <param name="product">
        /// El producto a crear.
        /// </param>
        /// <returns>
        /// El producto creado con su ID asignado.
        /// </returns>
        Task<Product> CreateAsync(Product product);

        /// <summary>
        /// Actualiza un producto existente.
        /// </summary>
        /// <param name="product">
        /// El producto con los datos actualizados.
        /// </param>
        /// <returns>
        /// Una tarea que representa la operación asincrónica.
        /// </returns>
        Task UpdateAsync(Product product);

        /// <summary>
        /// Elimina un producto por su ID.
        /// </summary>
        /// <param name="id">
        /// El ID del producto a eliminar.
        /// </param>
        /// <returns>
        /// Una tarea que representa la operación asincrónica.
        /// </returns>
        Task DeleteAsync(int id);
    }
}