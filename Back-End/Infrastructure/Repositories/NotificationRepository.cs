/// <summary>
/// Repositorio para la gestión de notificaciones en la base de datos.
/// </summary>

using Microsoft.EntityFrameworkCore;
using Back_End.Domain.Entities;
using Back_End.Domain.Interfaces;
using Back_End.Infrastructure.Data;

namespace Back_End.Infrastructure.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly AppDbContext _context;
        public NotificationRepository(AppDbContext context)
        {
            _context = context;
        }

        /// <inheritdoc/>
        public async Task AddAsync(Notification notification)
        {
            // Agregar la notificación al contexto y guardar los cambios en la base de datos
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }

        /// <inheritdoc/>
        public async Task<List<Notification>> GetByUserAsync(string userId)
        {
            // Obtener todas las notificaciones del usuario ordenadas por fecha de creación descendente
            return await _context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }

        /// <inheritdoc/>
        public async Task MarkAsReadAsync(int notificationId)
        {
            // Buscar la notificación por su ID y marcarla como leída si existe
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification != null)
            {
                notification.IsRead = true;
                await _context.SaveChangesAsync();
            }
        }
    }
}