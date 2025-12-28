import OrderItemsProduct from "./OrdersItemsProduct";

/**
 * Componente que muestra los items de una orden.
 *
 * @param {Object} userOrder - Objeto que contiene la información del usuario y su ID.
 * @param {Array} orders - Lista de órdenes
 * @param {string} expandedUser - ID del usuario expandido
 * @param {function} toggleExpand - Función para alternar la expansión del usuario
 * @param {function} changeStatus - Función para cambiar el estado de la orden
 */
export default function OrdersItems({ userOrder, orders, expandedUser, toggleExpand, changeStatus }) {
  return (

    // Contenedor de la orden 
    <div
        key={userOrder.userId}
        className="border-2 border-neutral-300 rounded shadow p-10 bg-gray-50"
    >
        <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleExpand(userOrder.userId)}
        >
            <h2 className="text-lg font-semibold">
                <strong>Usuario:</strong> {userOrder.userId}
            </h2>

            {/* Botón para expandir/colapsar órdenes */}
            <button className="text-[14px] text-Color1 cursor-pointer">
                <strong>{expandedUser === userOrder.userId ? "Ocultar" : "Ver"}</strong>
            </button>
        </div>

        {/* Mostrar órdenes al expandir */}
        {expandedUser === userOrder.userId && (
        <div className="mt-7 space-y-3">
            {orders
            .filter((o) => o.userId === userOrder.userId)
            .map((order) => {
                const total = order.items?.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
                );
                return (

                // Contenedor de la orden 
                <OrderItemsProduct 
                    order={order} 
                    total={total} 
                    changeStatus={changeStatus}/>
                );  
            })}
        </div>
        )}
    </div>
  );
}