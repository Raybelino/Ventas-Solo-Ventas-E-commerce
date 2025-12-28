/**
 * Componente que muestra los detalles de un producto en una orden.
 *
 * @param {Object} order - Objeto que contiene la información de la orden.
 * @param {number} total - Total de la orden.
 * @param {function} changeStatus - Función para cambiar el estado de la orden.
 */
export default function OrderItemsProduct({order, total, changeStatus}) {

    if (!order) return null;

    return(
        <div className="border-2 border-neutral-300 rounded p-5 bg-White">

            {/* Información de la orden */}
            <div className="flex justify-between items-center">
                <p className="font-medium">
                    <strong>Orden:</strong> #{order.id} - Total: $
                    {total?.toFixed(2)}
                </p>

                {/* Selector de estado de la orden */}
                <select
                    value={order.status}
                    onChange={(e) =>
                    changeStatus(                              
                        order.id,
                        e.target.value)
                    }
                    className="border-2 border-neutral-300 rounded px-3 py-1"
                >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En camino">En camino</option>
                    <option value="Entregado">Entregado</option>
                </select>
            </div>
            <ul className="list-disc list-inside mt-2">
            {order.items?.map((item, index) => (
                <li key={index} 
                className={`border-2 border-neutral-300 rounded p-2 m-2
                ${order.status === "" ? "bg-red-500" : ""}
                ${order.status === "Entregado" ? "bg-Color5" : ""}
                ${order.status === "Pendiente" ? "bg-red-500" : ""}
                ${order.status === "En camino" ? "bg-yellow-300" : ""}`}>
                    <strong>{item.productName} x{item.quantity}</strong> - $
                    {(item.price * item.quantity).toFixed(2)}
                </li>
            ))}
            </ul>
        </div>
    )
}