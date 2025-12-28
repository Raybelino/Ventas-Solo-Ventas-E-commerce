/// <summary>
/// Interfaz para el servicio de órdenes.
/// </summary>

using Back_End.Application.DTO;
using Back_End.Domain.Entities;

namespace Back_End.Application.Services.Interfaces
{
    public interface IOrderService
    {
        /// <summary>
        /// Crea una nueva orden.
        /// </summary>
        /// <param name="dto">
        /// El DTO que contiene la información de la orden a crear.
        /// </param>
        /// <returns>
        /// Una tarea que representa la operación asincrónica.
        /// </returns>
        Task CreateOrderAsync(OrderDto dto);

        /// <summary>
        /// Obtiene todas las órdenes.
        /// </summary>
        /// <returns>
        /// Una lista de todas las órdenes en el sistema.
        /// </returns>
        Task<List<Order>> GetAllOrdersAsync();

        /// <summary>
        /// Actualiza el estado de una orden.
        /// </summary>
        /// <param name="orderId">
        /// El ID de la orden a actualizar.
        /// </param>
        /// <param name="newStatus">
        /// El nuevo estado de la orden.
        /// </param>
        /// <returns>
        /// true si la actualización fue exitosa; de lo contrario, false.
        /// </returns>
        Task<bool> UpdateOrderStatusAsync(int orderId, string newStatus);
    }
}