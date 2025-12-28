import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../../services/productService";

/**
 * Componente que representa un item en el carrito de compras.
 * 
 * Renderiza la información del producto y permite eliminarlo del carrito.
 * 
 * @param {Object} item Propiedad que contiene la información del producto en el carrito.
 * @param {Function} onRemove Función que se llama al eliminar el producto del carrito.
 */
export default function CartItem({ item, onRemove }) {

    // Estado del producto
    const [product, setProduct] = useState(null);

    // Hook para redirigir a otras páginas
    const navigate = useNavigate();

    // Efecto para cargar la información del producto
    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductById(item.id);
            setProduct(data);
        };
        fetchProduct();
    }, []);

  return (
    <div className="border-2 relative items-center border-neutral-300 bg-white p-6 rounded-2xl flex gap-10 cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
        {/* Imagen del producto */}
        {product === null ? (
            <p className="w-24 h-24 items-center justify-center">Cargando...</p>
        ) : (
            <img src={product.imagePath} alt={item.name} className="w-24 h-24 object-cover rounded-2xl" />
        )}

        {/* Información del producto */}
        <div>
            <h2 className="font-bold text-2xl my-2">{item.name}</h2>
            <p className="text-gray-600 my-1">{item.description}</p>
            <div className="flex gap-10">
                <p><strong>Cantidad:</strong> {item.quantity}</p>
                <p><strong>Precio:</strong> <strong className="text-Color1">${item.price}</strong></p>
            </div>
        </div>

        {/* Botón para eliminar el producto del carrito */}
        <button onClick={() => onRemove(item.id)} className="absolute right-10 p-3 rounded-md font-bold text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer">Eliminar</button>
    </div>
  );
}