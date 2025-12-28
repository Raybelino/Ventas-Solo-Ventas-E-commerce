import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Card_coment from "../../components/product/Cardcoment";
import { getProductById, deleteProduct } from "../../services/productService";
import { getUserRole, getUserId } from "../../services/authService";
import { getReviewsByProductId, addReview, deleteReview } from "../../services/reviewService";

/**
 * Componente para ver los detalles de un producto.
 *
 * Renderiza la información del producto, así como las reseñas asociadas.
 *
 * Funcionalidades:
 * - Ver detalles del producto
 * - Agregar al carrito
 * - Agregar reseñas
 * - Eliminar reseñas
 */
export default function ViewProduct() {

  // Obtener el ID del producto de la URL
  const { id } = useParams();

  // Hook para redireccionar
  const navigate = useNavigate();

  // Estado del producto
  const [product, setProduct] = useState(null);

  // Estado del rol del usuario
  const [role, setRole] = useState(null);

  // Estado de la cantidad a agregar al carrito
  const [quantity, setQuantity] = useState(1);

  // Estado de carga
  const [loading, setLoading] = useState(true);

  // Estado de las reseñas
  const [reviews, setReviews] = useState([]);

  // Estado del formulario de reseña
  const [comment, setComment] = useState("");

  // Estado de la calificación
  const [rating, setRating] = useState(5);

  // Estado para mostrar/ocultar el formulario de reseña
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Estado para controlar el envío de reseñas
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Estado del ID del usuario
  const [userId, setUserId] = useState(null);

  // Estado para mostrar mensajes
  const [message, setMessage] = useState("");

  // Efecto para obtener datos del producto y reseñas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, reviewsRes] = await Promise.all([
          getProductById(id),
          getReviewsByProductId(id)
        ]);
        setProduct(productRes);
        setReviews(reviewsRes);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        alert("Error al cargar datos del producto");
      } finally {
        setLoading(false);
      }
    };

    // Llamar a la función para obtener datos
    fetchData();
    setRole(getUserRole());
    setUserId(getUserId());
  }, [id]);

  /**
   * Maneja la eliminación del producto.
   * @returns {Promise<void>}
   */
  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Deseas eliminar este producto?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      setMessage("Producto eliminado correctamente");
      setTimeout(() => setMessage(""), 3000);
      navigate("/");
    } catch (error) {
      setMessage("Error al eliminar el producto");
      setTimeout(() => setMessage(""), 3000);
      console.error(error);
    }
  };

  /**
   * Maneja la edición del producto.
   * Redirige a la página de edición del producto.
   */
  const handleEdit = () => {
    navigate(`/Editproduct/${id}`);
  };

  /**
   * Maneja el envío de reseñas.
   */
  const handleSubmitReview = async () => {
    if (!comment.trim()) {
      setMessage("El comentario no puede estar vacío");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setIsSubmittingReview(true);

    try {
      await addReview({ productId: id, rating, comment });

      const updatedReviews = await getReviewsByProductId(id);
      setReviews(updatedReviews);

      setComment("");
      setRating(5);
      setShowReviewForm(false);
      setMessage("Reseña enviada con éxito");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error al enviar reseña:", error);
      setMessage("Error al enviar reseña");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  /**
   * Maneja la eliminación de reseñas.
   * @param {number} reviewId - El ID de la reseña a eliminar.
   */
  const handleDeleteReview = async (reviewId) => {
    const confirmDelete = window.confirm("¿Deseas eliminar esta reseña?");
    if (!confirmDelete) return;

    try {
      await deleteReview(reviewId);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
      setMessage("Reseña eliminada");
      setTimeout(() => setMessage(""), 3000);

      const updatedReviews = await getReviewsByProductId(id);
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error al eliminar reseña:", error);
      setMessage("Error al eliminar reseña");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  /**
   * Maneja la adición de productos al carrito.
   */
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(p => p.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setMessage("Producto añadido al carrito");
    setTimeout(() => setMessage(""), 3000);
  };

  /**
   * Renderiza las estrellas de calificación.
   * @returns {JSX.Element}
   */
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map(star => (
      <span
        key={star}
        onClick={() => setRating(star)}
        className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  // Maneja la carga del producto
  if (loading) return <div className="p-10">Cargando producto...</div>;
  if (!product) return <div className="p-10">Producto no encontrado</div>;

  return (
    <>

      {/* Encabezado */}
      <Header />

      {/* Mensaje de estado */}
      {message != "" ? 
      <div className="fixed z-20 left-25 top-25 p-4 rounded-2xl transition-all duration-300 opacity-100 bg-green-200 text-green-800">{message}</div> 
      : <div className="fixed z-20 -left-25 top-25 p-4 rounded-2xl transition-all duration-300 opacity-0 bg-green-200 text-green-800"></div>}

      {/* Botones de administración */}
      {(role === "Admin" || role === "admin") && (
        <div className="fixed bottom-7 right-7 flex flex-col gap-4 z-50">

          {/* Botones de editar */}
          <button
            className="flex items-center justify-center rounded-full h-16 w-16 bg-yellow-500 text-white text-3xl shadow-lg hover:bg-yellow-600 cursor-pointer"
            onClick={handleEdit}
            title="Editar producto"
          >
            <img className="w-11" src="../../../public/casual/edit.svg" alt="Editar producto" />
          </button>

          {/* Botón de eliminar producto */}
          <button
            className="flex items-center justify-center rounded-full h-16 w-16 bg-red-600 text-white text-3xl shadow-lg hover:bg-red-700 cursor-pointer"
            onClick={handleDelete}
            title="Eliminar producto"
          >
            <img className="w-11" src="../../../public/casual/delete.svg" alt="Eliminar producto" />
          </button>
        </div>
      )}

      {/* Detalles del producto y reseñas */}
      <div className="pt-20 px-5 bg-Fondo">
        <div className="flex justify-center-safe gap-20">
          <div className="w-[450px] h-[260px] bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
            {/* Imagen del producto */}
            {product.imagePath ? (
              <img
                src={`${product.imagePath}`}
                alt={product.name}
                className="object-contain max-h-full max-w-full"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            ) : null}
            <span 
              className={product.imagePath ? "hidden" : "text-gray-500"}
            >
              Sin imagen
            </span>
          </div>

          {/* Detalles del producto */}
          <div className="flex flex-col justify-between gap-5 w-150 max-w-xl">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-2xl text-black font-bold">$<strong className="text-5xl">{product.price}</strong></p>
            <p className="my-5 text-gray-600">{product.description}</p>
            <div>
              <label className="">Cantidad</label>
              <div className="flex gap-2 items-center mt-2">

                {/* Botones de cantidad */}
                <button
                  className="bg-red-500 text-white px-3 py-1 cursor-pointer rounded hover:bg-red-600"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  -
                </button>

                {/* Input de cantidad */}
                <input
                  type="number"
                  value={quantity}
                  onChange={e => {
                    const val = parseInt(e.target.value);
                    setQuantity(isNaN(val) || val < 1 ? 1 : val);
                  }}
                  className="w-16 text-center border rounded py-1"
                  min="1"
                />

                {/* Botón para aumentar cantidad */}
                <button
                  className="bg-green-500 text-white px-3 py-1 cursor-pointer rounded hover:bg-green-600"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  +
                </button>
              </div>
            {/* Botón para añadir al carrito */}
            </div>
              <button className="w-full bg-Color1 text-white py-3 cursor-pointer rounded-2xl hover:opacity-90" onClick={handleAddToCart}>
                Añadir al carrito
              </button>
          </div>
        </div>
        <div className="w-full h-[1px] border border-neutral-300 mt-20"/>  

        {/* Reseñas del producto */}
        <div className="flex flex-col items-center mt-10 mx-10">
          <div className="flex justify-between items-center w-full max-w-6xl pt-8 mb-6">
            <h3 className="text-2xl font-bold">Reseñas</h3>

            {/* Botón para escribir reseña */}
            {userId && !showReviewForm && (
              <button 
                className="bg-Color1 text-white px-4 py-2 rounded hover:opacity-90"
                onClick={() => setShowReviewForm(true)}
              >
                Escribir reseña
              </button>
            )}
          </div>

          {/* Formulario de reseña */}
          {showReviewForm && (
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <div className="mb-4">
                <label className="block mb-2 font-medium">Calificación:</label>
                <div className="flex">
                  {renderStars()}
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Comentario:</label>

                {/* Textarea para el comentario */}
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-gray-300 rounded p-3"
                  rows="4"
                  placeholder="Escribe tu reseña sobre este producto..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">

                {/* Botón para cancelar la reseña */}
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancelar
                </button>

                {/* Botón para enviar la reseña */}
                <button
                  className="bg-Color1 text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
                  onClick={handleSubmitReview}
                  disabled={isSubmittingReview}
                >
                  {isSubmittingReview ? "Enviando..." : "Enviar reseña"}
                </button>
              </div>
            </div>
          )}

          {/* Lista de reseñas */}
          <div className="grid grid-cols-1 mt-5 w-full max-w-6xl xl:grid-cols-3 md:grid-cols-2 gap-6">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-center py-8 col-span-full">
                Este producto aún no tiene reseñas.
              </p>
            ) : (
              // Mapeo de reseñas
              reviews.map(review => (
                <div key={review.reviewId} className="relative mb-10">
                  <Card_coment
                    comment={review.comment}
                    rating={review.rating}
                    username={review.username}
                    createdAt={review.createdAt}
                  />
                  {/* Botón para eliminar reseña */}
                  {(role === "Admin" || role === "admin" || userId === review.userId) && (
                    <button
                      className="absolute top-2 right-2"
                      onClick={() => handleDeleteReview(review.reviewId)}
                      title="Eliminar reseña"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" 
                          className="h-8 w-8" 
                          viewBox="0 0 20 20" 
                          fill="red">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
