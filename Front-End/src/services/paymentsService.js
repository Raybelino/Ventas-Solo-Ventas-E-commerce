import api from "../api/axios";

/**
 * Crea una sesión de pago.
 *
 * @param {Object} payload - Los datos para crear la sesión de pago.
 * @returns {Promise<string>} - El ID de la sesión de pago.
 */
export const createCheckoutSession = async (payload) => {
  const response = await api.post("/Payments/create-checkout-session", payload);
  const { sessionId } = response.data;
  return sessionId;
};

/**
 * Crea una orden.
 *
 * @param {Object} payload - Los datos de la orden.
 * @returns {Promise<Object>} - Los datos de la orden creada.
 */
export const createOrder = async (payload) => {
  const response = await api.post("/Orders", payload);
  return response.data;
};