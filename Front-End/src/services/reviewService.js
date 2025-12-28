import api from '../api/axios';

/**
 * Obtiene las reseñas de un producto por su ID.
 *
 * @param {Number} productId - El ID del producto.
 * @returns {Promise<Array>} - Una promesa que se resuelve con la lista de reseñas.
 */
export const getReviewsByProductId = async (productId) => {
  try {
    const response = await api.get(`/Review/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo reseñas:', error);
    return [];
  }
};

/**
 * Añade una reseña a un producto.
 *
 * @param {Object} reviewData - Los datos de la reseña.
 * @param {Number} reviewData.productId - El ID del producto.
 * @param {Number} reviewData.rating - La calificación de la reseña.
 * @param {string} reviewData.comment - El comentario de la reseña.
 * @returns {Promise<Object>} - Los datos de la reseña creada.
 */
export const addReview = async ({ productId, rating, comment }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token no disponible");

    const response = await api.post('/Review', 
      { productId, rating, comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al agregar reseña:', error);
    throw error;
  }
};

/**
 * Elimina una reseña por ID.
 *
 * @param {Number} reviewId - El ID de la reseña.
 * @returns {Promise<boolean>} - Verdadero si la eliminación fue exitosa.
 */
export const deleteReview = async (reviewId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token no disponible");

    await api.delete(`/Review/${reviewId}`);

    return true;
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    throw error;
  }
};