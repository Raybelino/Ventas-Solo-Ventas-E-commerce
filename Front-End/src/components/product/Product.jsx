import { Link } from "react-router-dom";

/**
 * Componente que muestra un producto.
 *
 * @param {String} productId - El ID del producto.
 * @param {String} name - El nombre del producto.
 * @param {String} description - La descripción del producto.
 * @param {Number} price - El precio del producto.
 * @param {String} imageUrl - La URL de la imagen del producto.
 */
export default function Product({ productId, name, description, price, imageUrl }) {

  // URL de la imagen del producto
  const imageSrc = imageUrl || "../../../public/casual/default.svg";

  return (

    // Enlace al detalle del producto
    <Link to={`/product/${productId}`} className="w-full">
      <div className="p-4 flex flex-col gap-4 rounded-2xl border-2 border-neutral-300 bg-white h-full hover:shadow-lg transition">

        {/* Imagen del producto */}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-70 object-cover rounded-md mb-2"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-md">
            <span className="text-gray-400">Cargando imagen...</span>
          </div>
        )}

        {/* Información del producto */}
        <div className="flex flex-col">
          <strong className="text-[16px]">{name}</strong>
          <span className="text-sm text-gray-600">{description}</span>
          <span className="text-Color1 font-semibold text-lg">${price}</span>
        </div>
      </div>
    </Link>
  );
}