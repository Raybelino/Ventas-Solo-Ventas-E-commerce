import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';

/**
 * Inicia sesión un usuario.
 *
 * @param {Object} form - El formulario de inicio de sesión.
 * @param {string} form.email - El correo electrónico del usuario.
 * @param {string} form.password - La contraseña del usuario.
 * @returns {Promise<Object>} - Los datos del usuario autenticado.
 */
export const login = async (form) => {
  try {
    const userLogin = {
      email: form.email,
      password: form.password
    }; 
    const response = await api.post('/Auth/login', userLogin);

    const data = response.data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('userRole', data.user.role);
  } catch (error) {
    console.error('Error en login:', error);

    if (error.response) {
      const backendMessage = error.response.data?.message || 'Correo o contraseña incorrecta';
      throw new Error(backendMessage);
    }
  }
};

/**
 * Registra un nuevo usuario.
 *
 * @param {Object} userData - Los datos del usuario.
 * @returns {Promise<Object>} - Los datos del usuario registrado.
 */
export const register = async (userData) => {
  try {
    const response = await api.post('/Auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error en registro:', error);
    if (error.response) {
      console.error("Respuesta completa del backend:", error.response.data);
      throw new Error(
        JSON.stringify(error.response.data) || 'Error en el registro'
      );
    }
    if (error.response) {
      throw new Error(error.response.data.message || 'Error en el registro');
    } else if (error.request) {
      throw new Error('No se pudo conectar con el servidor');
    } else {
      throw new Error('Error inesperado');
    }    
  }
}; 

/**
 * Obtiene el rol del usuario desde el almacenamiento local.
 *
 * @returns {string|null} - El rol del usuario o null si no está disponible.
 */
export const getUserRole = () => {
  const savedRole = localStorage.getItem('userRole');
  if (savedRole) return savedRole;

  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
  } catch (error) {
    console.error('Error decodificando token:', error);
    return null;
  }
};

/**
 * Obtiene el ID del usuario desde el almacenamiento local.
 *
 * @returns {string|null} - El ID del usuario o null si no está disponible.
 */
export function getUserId() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.sub || decoded.nameid || decoded.id || null;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
}

/**
 * Cierra la sesión del usuario.
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
};

/**
 * Verifica si el usuario está autenticado.
 *
 * @returns {boolean} - Verdadero si el usuario está autenticado, falso en caso contrario.
 */
export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

/**
 * Obtiene el perfil del usuario autenticado.
 *
 * @returns {Promise<Object>} - Los datos del perfil del usuario.
 */
export const getUserProfile = async () => {
  const res = await api.get("/Auth/profile");
  return res.data;
};

/**
 * Actualiza el perfil del usuario autenticado.
 *
 * @param {Object} data - Los nuevos datos del perfil del usuario.
 * @returns {Promise<Object>} - Los datos actualizados del perfil del usuario.
 */
export const updateUserProfile = async (data) => {
  const res = await api.put("/Auth/profile", data);
  return res.data;
};