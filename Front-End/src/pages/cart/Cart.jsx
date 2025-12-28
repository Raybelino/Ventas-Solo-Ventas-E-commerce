import { useState, useEffect } from "react";
import { createCheckoutSession } from "../../services/paymentsService";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { loadStripe } from "@stripe/stripe-js";
import CartItem from "./CartItem";

/* Cargar Stripe */
const stripePromise = loadStripe("pk_test_51RiREnCja6HHO2yIzaquCn5Ev8qMA5rpviXFUOljni5Vn2sTlwdKzoZVhli2hmEwJmccLJxXwZBvzXLQGtrbz2ch00GokUpVGK");

/**
 * Maneja el carrito de compras.
 * 
 * Renderiza los productos en el carrito y permite la eliminación de productos.
 * 
 * Funcionalidades:
 * - Renderizar los productos en el carrito.
 * - Permitir la eliminación de productos del carrito.
 * - Calcular el total de la compra.
 * - Integrar con Stripe para el proceso de pago.
 */
export default function Cart() {

  // Estado del carrito
  const [cartItems, setCartItems] = useState([]);

  // Estado de pago
  const [isPaying, setIsPaying] = useState(false);

  // Cargar el carrito desde el almacenamiento local
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  /**
   * Elimina un producto del carrito.
   * @param {Number} id - El ID del producto a eliminar.
   */
  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Calcular el total de la compra
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  /**
   * Maneja el proceso de pago.
   * - Inicia el proceso de pago con Stripe.
   * - Redirige al usuario a la página de pago de Stripe.
   * - Maneja los errores durante el proceso de pago.
   */
  const handlePayment = async () => {
    const stripe = await stripePromise;
    setIsPaying(true);

    try {
      const payload = cartItems.map(item => ({
        productName: item.name && item.name.trim() !== "" ? item.name : "Producto sin nombre",
        price: item.price,
        quantity: item.quantity
      }));

      const sessionId = await createCheckoutSession(payload);

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al iniciar el proceso de pago");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <>

      {/* Encabezado */}
      <Header />

      <div className="p-10 bg-Fondo">

        {/* Título y total */}
        <div className="flex items-center m-2 mb-8">
          <h1 className="text-4xl font-bold">Tu carrito</h1>
          {cartItems.length > 0 && (
            <div className="flex flex-grow justify-end items-center text-center gap-6">

              {/* Total */}
              <div className="font-bold text-xl mr-10">Total: ${total.toFixed(2)}</div>

              {/* Botón de pago */}
              <button
                onClick={handlePayment}
                disabled={isPaying}
                className="bg-Color1 text-white text-[15px] px-4 py-2 rounded-2xl cursor-pointer"
              >
                {isPaying ? "Procesando pago..." : "Comprar todo"}
              </button>
            </div>
          )}
        </div>

        {/* Mensaje si el carrito está vacío */}
        {cartItems.length === 0 ? (
          <p className="font-bold bg-red-400 p-10 rounded-2xl">No hay productos en el carrito</p>
        ) : (
          //Productos en el carrito
          <div className="space-y-4">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} onRemove={removeItem} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}