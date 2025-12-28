/**
 * Componente de entrada de formulario.
 *
 * @param {string} title - Título del campo
 * @param {string} name - Nombre del campo
 * @param {string} value - Valor del campo
 * @param {function} onChange - Función para manejar cambios en el campo
 * @param {string} type - Tipo de entrada (text, password, etc.)
 * @param {string} placeholder - Texto de marcador de posición
 * @param {boolean} isObligatory - Indica si el campo es obligatorio
 * @param {string} className - Clases CSS adicionales
 */
export default function Input({ 
  title, 
  name, 
  value, 
  onChange, 
  type = "text", 
  placeholder,
  isObligatory = false,
  className = ""}) {

  return (
    <div className={`h-20 ${className}`}>
      
      {/* Título y campo obligatorio */}
      <div className="flex  gap-5">
        <h4 className="h-9">{title}</h4>
        {isObligatory ? <h4 className="text-red-700">* Obligatorio</h4> : ""}
      </div>

      {/* Campo de entrada */}
      <input 
        name={name}
        value={value}
        onChange={onChange}
        type={type} 
        placeholder={placeholder} 
        className="bg-white rounded-lg border border-gray-300 outline-none px-2 py-2.5 w-full col-span-2" />
    </div>
  );
}