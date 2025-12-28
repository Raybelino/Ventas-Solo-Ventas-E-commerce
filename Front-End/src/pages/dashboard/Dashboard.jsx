import { useEffect, useState } from "react";
import { handleStatusChange } from "../../services/orderService";
import { fetchOrders } from "../../services/orderService";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import OrderItems from "../../components/orders/ordersItems";

/**
 * Componente principal del dashboard.
 * 
 * Renderiza las órdenes agrupadas por usuario.
 *
 * Funcionalidades:
 * - Ver detalles de la orden
 * - Cambiar estado de la orden
 */
export default function Dashboard() {

  // Estado para las órdenes
  const [orders, setOrders] = useState([]);

  // Estado para el usuario expandido
  const [expandedUser, setExpandedUser] = useState(null);

  // Efecto para cargar órdenes
  useEffect(() => {

    /**
     * Carga las órdenes desde el servicio.
     */
    const loadOrders = async () => {
      const result = await fetchOrders();
      setOrders(result);
    };

    // Llamar a la función para cargar órdenes
    loadOrders();
  }, []);

  /**
   * Alterna la expansión de un usuario.
   * @param {number} userId - El ID del usuario a expandir.
   */
  const toggleExpand = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  /**
   * Cambia el estado de una orden.
   * @param {number} orderId - El ID de la orden a cambiar.
   * @param {string} newStatus - El nuevo estado de la orden.
   */
  const changeStatus = (orderId, newStatus) => {
    const isChangeStatus = handleStatusChange(orderId,newStatus);
    if (isChangeStatus){
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    }else{
      alert("Hubo un error en el cambio de estatus, vuelva a intentarlo")
    }
  }

  return (
    <>

      {/* Encabezado */}
      <Header />
      <div className="p-6 bg-Fondo">
        <h1 className="text-4xl font-bold mb-10 mx-2">Órdenes por usuario</h1>

        {/* Aquí podrías agregar un filtro por usuario */}
        {orders.length === 0 ? (
          <p>No hay órdenes registradas</p>
        ) : (
          <div className="space-y-4">

            {/* Agrupamos órdenes por usuario */}
            {[...new Map(orders
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((o) => [o.userId, o])).values()].map(
              (userOrder) => (
                <OrderItems
                  key={userOrder.userId} 
                  userOrder={userOrder} 
                  orders={orders} 
                  expandedUser={expandedUser} 
                  toggleExpand={toggleExpand} 
                  changeStatus={changeStatus}
                />
              )
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
