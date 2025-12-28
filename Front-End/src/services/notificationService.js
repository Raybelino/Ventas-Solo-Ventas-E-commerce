import api from "../api/axios";

/**
 * Obtiene las notificaciones de un usuario.
 * @param {string} userId - El ID del usuario
 * @returns {Promise<Array>} - Lista de notificaciones
 */
export const getNotifications = async ( userId) => {
  try {
    const res = await api.get(`/Notifications/${userId}`);
    return res.data;
  } catch (error) {
    console.error('Error obteniendo notificaciones:', error);
    return [];
  }
};

/**
 * Marca una notificación como leída.
 * @param {string} notificationId - El ID de la notificación
 * @returns {Promise<void>}
 */
export const markNotificationAsRead = async (notificationId) => {
  try {
    await api.put(`/Notifications/${notificationId}/mark-as-read`);
  } catch (error) {
    console.error('Error al marcar notificación como leída:', error);
  }
};