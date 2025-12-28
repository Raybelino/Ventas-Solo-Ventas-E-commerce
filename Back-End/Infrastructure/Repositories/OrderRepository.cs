/// <summary>
/// Repositorio para la gestión de órdenes en la base de datos.
/// </summary>

using Microsoft.EntityFrameworkCore;
using Back_End.Domain.Entities;
using Back_End.Domain.Interfaces;
using Back_End.Infrastructure.Data;

namespace Back_End.Infrastructure.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _context;
        public OrderRepository(AppDbContext context)
        {
            _context = context;
        }

        /// <inheritdoc/>
        public async Task CreateAsync(Order order)
        {
            // Agregar la orden al contexto y guardar los cambios en la base de datos
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
        }

        /// <inheritdoc/>
        public async Task<List<Order>> GetAllAsync() =>
            await _context.Orders
            .Include(o => o.Items)
            .ToListAsync();

        /// <inheritdoc/>
        public async Task<bool> UpdateStatusAsync(int orderId, string newStatus)
        {

            var order = await _context.Orders.FindAsync(orderId);

            if (order == null)
                return false;

            // Actualizar el estado de la orden y guardar los cambios
            order.Status = newStatus;
            await _context.SaveChangesAsync();
            return true;
        }

        /// <inheritdoc/>
        public async Task<Order?> GetByIdAsync(int orderId) =>
            await _context.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == orderId);
    }
}