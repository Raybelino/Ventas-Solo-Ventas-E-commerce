/// <summary>
/// Servicio para gestionar órdenes y notificaciones.
/// </summary>

using Back_End.Application.DTO;
using Back_End.Application.Services.Interfaces;
using Back_End.Domain.Entities;
using Back_End.Domain.Interfaces;

namespace Back_End.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly INotificationRepository _notificationRepository;

        public OrderService(IOrderRepository orderRepository, INotificationRepository notificationRepository)
        {
            _orderRepository = orderRepository;
            _notificationRepository = notificationRepository;
        }

        /// <inheritdoc/>
        public async Task CreateOrderAsync(OrderDto dto)
        {
            var order = new Order
            {
                UserId = dto.UserId,
                CreatedAt = DateTime.UtcNow,
                Items = dto.Items?.Select(i => new OrderItem
                {
                    ProductId = i.ProductId,
                    ProductName = i.ProductName,
                    Price = i.Price,
                    Quantity = i.Quantity
                }).ToList()
            };

            await _orderRepository.CreateAsync(order);
        }

        /// <inheritdoc/>
        public async Task<List<Order>> GetAllOrdersAsync()
        {
            return await _orderRepository.GetAllAsync();
        }

        /// <inheritdoc/>
        public async Task<bool> UpdateOrderStatusAsync(int orderId, string newStatus)
        {
            var order = await _orderRepository.GetByIdAsync(orderId);
            if (order == null) return false;

            var updated = await _orderRepository.UpdateStatusAsync(orderId, newStatus);

            // Crear una notificación para el usuario si la actualización fue exitosa
            if (updated)
            {
                var notification = new Notification
                {
                    UserId = order.UserId,
                    Message = $"El estado de tu orden #{orderId} cambió a '{newStatus}'"
                };

                await _notificationRepository.AddAsync(notification);
            }

            return updated;
        }
    }
}