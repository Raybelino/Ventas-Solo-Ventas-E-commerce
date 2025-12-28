import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../services/authService";
import { createOrder } from "../../services/paymentsService";

/** 
 * Componente que muestra el estado del pago 
 */
export default function PaymentSuccess() {

  // Referencia para evitar múltiples llamadas a la API
  const isPaying = useRef(false);

  // Estado para mostrar mensajes al usuario
  const [message, setMessage] = useState('');

  // Hook para redirigir a otras páginas
  const navigate = useNavigate();

  // Efecto para crear la orden
  useEffect(() => {
    if (isPaying.current) return;
    isPaying.current = true;

    /**
     * Función que crea una orden de compra
     * @returns {Promise<void>}
     */
    const makeOrder = async () => {
      try {
        const stored = localStorage.getItem("cart");
        const cartItems = JSON.parse(stored || "[]");
        const userId = getUserId();

        if (!userId || cartItems.length === 0) return;

        const payload = {
          userId,
          items: cartItems.map(item => ({
            productId: item.id,
            productName: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        };

        const response = await createOrder(payload);
        if (!response) {
          setMessage("Orden confirmada tras el pago exitosamente");
          localStorage.removeItem("cart");
          setTimeout(() => {navigate("/");}, 2000);
        }
      } catch (error) {
        console.error("Error al crear la orden:", error);
        alreadyCalledRef.current = false; // permitir reintento
      }
    };

    // Llamada a la función para crear la orden
    makeOrder();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-Fondo min-h-screen">
      {/* Logo */}
      <div className="text-center cursor-pointer" onClick={()=> navigate("/")}>
          <h1 className="text-Color1 font-bold text-9xl">Ventas</h1>
          <h3 className="text-Color1 text-5xl">Solo Ventas</h3>
        </div>
      <div className="w-2xl p-8 py-10 text-center rounded-2xl bg-Color5">

        {/* Mensaje de éxito o error */}
        {message && (
            <div className={`px-4 py-2 mb-10 rounded-lg ${
              message.includes('exitosamente') ? 'bg-green-300 text-green-700 border-Color4 border' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}
        <h1 className="text-2xl font-bold text-green-700">¡Pago exitoso!</h1>
        <p>Gracias por tu compra. Estamos procesando tu orden.</p>
      </div>
    </div>
  );
}