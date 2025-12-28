import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole, getUserId , logout} from "../../services/authService";
import { getNotifications, markNotificationAsRead } from "../../services/notificationService";

/**
 * Componente de encabezado.
 *
 * Muestra el logotipo, la barra de búsqueda y los botones de navegación.
 *
 * Funcionalidades:
 * - Búsqueda de productos
 * - Navegación a diferentes secciones
 * - Notificaciones
 */
export default function Header({ onSearch }) {

  // Estado de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Estado para mostrar/ocultar notificaciones
  const [showNotifications, setShowNotifications] = useState(false);

  // Estado de las notificaciones
  const [notifications, setNotifications] = useState([]);

  // Hook para la navegación
  const navigate = useNavigate();

  // Efecto para manejar cambios en el estado de autenticación
  useEffect(() => {
    const role = getUserRole();
    setIsLoggedIn(!!role);
    
    if (role) {
      fetchNotifications();
    }
  }, []);

  /**
   * Función para obtener notificaciones del usuario
   */
  const fetchNotifications = async () => {
    try {
      const notifications = await getNotifications(getUserId());
      setNotifications(notifications);
    } catch (err) {
      console.error("Error al cargar notificaciones", err);
    }
  };

  /**
   * Función para marcar una notificación como leída
   * @param {number} id - El ID de la notificación
   */
  const markAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      fetchNotifications(); // Actualiza la lista
    } catch (err) {
      console.error("Error al marcar notificación como leída", err);
    }
  };

  /**
   * Función para cerrar sesión
   */
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between gap-0 p-4 bg-White border-b-2 border-neutral-300">

      {/* Logo */}
      <div className="text-center m-5 cursor-pointer" onClick={() => navigate("/")}>
        <h1 className="text-Color1 font-bold text-2xl">Ventas</h1>
        <h3 className="text-Color1 text-xl">Solo Ventas</h3>
      </div> 

      {/* Barra de búsqueda */}
      <div className="relative flex items-center justify-end w-full m-0 max-w-md xl:max-w-200 xl:ml-40">
        <input
          className=" rounded-full h-10 w-full bg-white border-2 border-neutral-400 px-4 pr-12 relative z-10"
          placeholder="Buscar productos..."
          onChange={(e) => onSearch(e.target.value)}
        />
         <img className="absolute w-7 right-3 z-20 pointer-events-none" src="../../../public/header/search.svg" alt="Buscar" />
      </div>

      {/* Botones de usuario */}
      <div className="flex gap-5 px-5">
        {isLoggedIn ? (
          <>

            {/* Botón de carrito */}
            <button
              onClick={() => navigate("/cart")}
              className="rounded-lg w-13 text-black cursor-pointer"
            >
              <img src="../../../public/header/cart.svg" alt="Carrito" />
            </button>

            {/* Botón de notificaciones */}
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) {
                  fetchNotifications(); // Carga notificaciones solo al abrir
                }
              }}
              className="rounded-lg w-13 text-black relative cursor-pointer"
            >
              <img src="../../../public/header/notification.svg" alt="Notificaciones" />

              {/* Contador de notificaciones */}
              {notifications.filter((n) => !n.isRead).length != 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2">
                  {notifications.filter((n) => !n.isRead).length}
                </span>
              )}
            </button>

            {/* Botón de perfil */}
            <button
            onClick={() => navigate("/profile")}
            className="rounded-lg w-13 text-black cursor-pointer"
            >
              <img src="../../../public/header/perfil.svg" alt="Perfil" />
            </button>

            {/* Botón de cerrar sesión */}
            <button
              onClick={handleLogout}
              className="rounded-lg w-13 text-white cursor-pointer"
            >
              <img src="../../../public/header/logout.svg" alt="Cerrar sesión" />
            </button>
          </>
        ) : (
          <>

            {/* Botón de iniciar sesión */}
            <button
              onClick={() => navigate("/login")}
              className="rounded-lg px-6 py-2 bg-Color1 text-black cursor-pointer hover:bg-green-500"
            >
              Iniciar sesión
            </button> 

            {/* Botón de registrarse */}
            <button
              onClick={() => navigate("/register")}
              className="rounded-lg px-6 py-2 bg-black text-white hover:bg-neutral-700 cursor-pointer"
            >
              Registrarte
            </button>
          </>
        )}

        {/* Notificaciones */}
        {showNotifications && (
        <div className="absolute right-10 mt-20 bg-white shadow rounded p-2 w-64">
          {notifications.length === 0 ? (
            <p className="text-gray-500">No tienes notificaciones</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-2 border-b ${
                  n.isRead ? "text-gray-500" : "font-bold"
                }`}
              >
                {n.message}

                {/* Botón de marcar como leído */}
                <button
                  onClick={() => markAsRead(n.id)}
                  className="ml-2 text-sm text-blue-500 cursor-pointer"
                >
                  Marcar como leída 
                </button>
              </div>
            ))
          )}
        </div>
      )}
      </div>
    </div>
  );
}
