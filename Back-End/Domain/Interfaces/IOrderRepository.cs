/// <summary>
/// Interfaz para el repositorio de órdenes, que define métodos para la gestión de órdenes de compra.
/// </summary>

using Back_End.Domain.Entities;

namespace Back_End.Domain.Interfaces
{
    public interface IOrderRepository
    {
        /// <summary>
        /// Crea una nueva orden en el sistema.
        /// </summary>
        /// <param name="order">
        /// Objeto <see cref="Order"/> que contiene la información de la orden a crear.
        /// </param>
        /// <returns>
        /// Una tarea que representa la operación asincrónica.
        /// </returns>
        Task CreateAsync(Order order);

        /// <summary>
        /// Obtiene todas las órdenes en el sistema.
        /// </summary>
        /// <returns>
        /// Una lista de objetos <see cref="Order"/> que representan todas las órdenes.
        /// </returns>
        Task<List<Order>> GetAllAsync();

        /// <summary>
        /// Actualiza el estado de una orden existente.
        /// </summary>
        /// <param name="orderId">
        /// Parametro de tipo entero que representa el identificador único de la orden a actualizar.
        /// </param>
        /// <param name="newStatus">
        /// Parametro de tipo cadena que representa el nuevo estado de la orden.
        /// </param>
        /// <returns>
        /// Un valor booleano que indica si la actualización fue exitosa (true) o no (false).
        /// </returns>
        Task<bool> UpdateStatusAsync(int orderId, string newStatus);

        /// <summary>
        /// Obtiene una orden por su identificador único.
        /// </summary>
        /// <param name="orderId">
        /// Parametro de tipo entero que representa el identificador único de la orden a buscar.
        /// </param>
        /// <returns>
        /// Un objeto <see cref="Order"/> si se encuentra una orden con el ID proporcionado;
        /// </returns>
        Task<Order?> GetByIdAsync(int orderId);

    }
}