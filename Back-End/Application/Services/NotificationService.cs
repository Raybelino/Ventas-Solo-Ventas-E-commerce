/// <summary>
/// Servicio para la gestión de notificaciones.
/// </summary>

using Back_End.Application.Services.Interfaces;
using Back_End.Domain.Entities;
using Back_End.Domain.Interfaces;

namespace Back_End.Application.Services
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;
        public NotificationService(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        /// <inheritdoc/>
        public async Task AddNotificationAsync(Notification notification) =>
            await _notificationRepository.AddAsync(notification);

        /// <inheritdoc/>
        public async Task<List<Notification>> GetNotificationsByUserAsync(string userId) =>
            await _notificationRepository.GetByUserAsync(userId);

        /// <inheritdoc/>
        public async Task MarkNotificationAsReadAsync(int notificationId) =>
            await _notificationRepository.MarkAsReadAsync(notificationId);
    }
}