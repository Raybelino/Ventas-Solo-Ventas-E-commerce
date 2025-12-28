import { useState } from "react";

/**
 * Componente que muestra un comentario de un producto.
 *
 * @param {String} comment - El comentario del producto.
 * @param {Number} rating - La calificación del producto.
 * @param {String} username - El nombre de usuario del autor del comentario.
 * @param {String} createdAt - La fecha de creación del comentario.
 */
export default function Card_coment({ comment, rating, username, createdAt }) {

  // Estado para manejar la expansión del comentario
  const [expanded, setExpanded] = useState(false);

  /**
   * Renderiza las estrellas de calificación.
   */
  const renderStars = () => (
    <div className="flex space-x-1 text-yellow-400 text-2xl mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>{star <= rating ? "★" : "☆"}</span>
      ))}
    </div>
  );

  // Determina si el comentario es largo
  const isLongComment = comment.length > 250;
  const displayedComment =
    !expanded && isLongComment
      ? comment.slice(0, 149) + "..."
      : comment;

  return (
    <div
      className={`rounded-2xl border border-gray-300 p-4 bg-white shadow-md hover:shadow-lg transition-all flex flex-col justify-between 
        ${expanded ? "h-auto" : "h-[180px]"}`}
    >
      <div>

        {/* Estrellas de calificación */}
        {renderStars()}
        <p className="text-gray-800 mb-2 whitespace-pre-line break-words">
          {displayedComment}
        </p>
        {isLongComment && (

          // Botón para expandir/contraer el comentario
          <button
            className="text-blue-600 text-sm mb-2 hover:underline"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Ver menos" : "Ver más"}
          </button>
        )}
      </div>

      {/* Información del autor */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>{username}</span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}