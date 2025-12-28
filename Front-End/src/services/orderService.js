import api from "../api/axios";

/**
 * Obtiene todas las órdenes.
 * @returns {Promise<Array>} - Una promesa que se resuelve con la lista de órdenes.
 */
export const fetchOrders = async () => {
    try {
      const data = await api.get("/Orders");
      return data.data;
    } catch (err) {
      console.error(err);
      alert("Error al cargar las órdenes");
    }
  };

/**
 * Maneja el cambio de estado de una orden.
 *
 * @param {string} orderId - El ID de la orden.
 * @param {string} newStatus - El nuevo estado de la orden.
 * @returns {Promise<boolean>} - Una promesa que se resuelve en verdadero si la actualización fue exitosa.
 */
export const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/Orders/${orderId}/status`, { status: newStatus });
      // Actualizamos localmente el estado
      alert(`Estado actualizado a "${newStatus}" y notificación enviada.`);
      return true;
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el estado");
      return false;
    }
};