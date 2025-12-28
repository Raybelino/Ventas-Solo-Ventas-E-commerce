/// <summary>
/// Interfaz para el repositorio de productos, que define métodos para la gestión de productos.
/// </summary>

using Back_End.Domain.Entities;

namespace Back_End.Domain.Interfaces
{
    public interface IProductRepository
    {
        /// <summary>
        /// Obtiene todos los productos disponibles en el sistema.
        /// </summary>
        /// <returns>
        /// Una colección de objetos <see cref="Product"/> que representan todos los productos.
        /// </returns>
        Task<IEnumerable<Product>> GetAllAsync();

        /// <summary>
        /// Obtiene un producto por su identificador único.
        /// </summary>
        /// <param name="id">
        /// Valor entero que representa el identificador único del producto a buscar.
        /// </param>
        /// <returns>
        /// Un objeto <see cref="Product"/> si se encuentra un producto con el ID proporcionado;
        /// </returns>
        Task<Product?> GetByIdAsync(int id);

        /// <summary>
        /// Crea un nuevo producto en el sistema.
        /// </summary>
        /// <param name="product">
        /// Parametro de tipo <see cref="Product"/> que contiene la información del producto a crear.
        /// </param>
        /// <returns>
        /// Un objeto <see cref="Product"/> que representa el producto creado, incluyendo su ID asignado.
        /// </returns>
        Task<Product> CreateAsync(Product product);

        /// <summary>
        /// Actualiza la información de un producto existente.
        /// </summary>
        /// <param name="product">
        /// Parametro de tipo <see cref="Product"/> que contiene la información actualizada del producto.
        /// </param>
        /// <returns>
        /// Una tarea que representa la operación asincrónica.
        /// </returns>
        Task UpdateAsync(Product product);

        /// <summary>
        /// Elimina un producto del sistema por su identificador único.
        /// </summary>
        /// <param name="id">
        /// Parametro de tipo entero que representa el identificador único del producto a eliminar.
        /// </param>
        /// <returns>
        /// Una tarea que representa la operación asincrónica.
        /// </returns>
        Task DeleteAsync(int id);
    }
}
