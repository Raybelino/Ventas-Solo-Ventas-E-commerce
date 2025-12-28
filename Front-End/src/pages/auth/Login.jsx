import { useState } from "react";
import Input from "../../components/common/Input";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

/**
 * Componente de inicio de sesión.
 * 
 * Renderiza un formulario de inicio de sesión y maneja la autenticación del usuario.
 * 
 * Funcionalidades:
 * - Autenticación de usuarios.
 * - Manejo de errores en el inicio de sesión.
 * - Recordar credenciales de inicio de sesión.
 */

export default function Login() {
  // Estado del formulario (email y contraseña)
  const [form, setForm] =  useState({
    email: "",
    password: ""
  });

  // Estado del checkbox "Recordar contraseña"
  const [rememberMe, setRememberMe] = useState(false);

  // Estado del mensaje de error o validación
  const [message, setMessage] = useState("");

  // Estado de carga
  const [loading, setLoading] = useState(false);

  // Hook para la navegación
  const navigate = useNavigate();

  /** Maneja los cambios en los campos del formulario 
   * @param {Object} e - Evento del cambio en el input
  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /** Maneja el envío del formulario
   * @param {Object} e - Evento del envío del formulario
   * - Previene el comportamiento por defecto del formulario.
   * - Establece el mensaje y el estado de carga.
   * - Realiza la llamada al servicio de autenticación.
   * - Maneja la navegación o los errores según la respuesta.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (!form.email || !form.password) {
        setMessage("Por favor, completa todos los campos");
        setLoading(false);
        return;
      }

      await login(form);

      navigate("/");
    } catch (error) {
      setLoading(false);
      setMessage(error.message || "Correo o contraseña incorrecta");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10">

      {/* Logo */}
      <div className="text-center cursor-pointer" onClick={()=> navigate("/")}>
        <h1 className="text-Color1 font-bold text-9xl">Ventas</h1>
        <h3 className="text-Color1 text-5xl">Solo Ventas</h3>
      </div>

      {/* Mensaje de error */}
      {message && (
        <div className="px-4 py-2 rounded-lg bg-red-100 text-red-700">
          {message}
        </div>
      )}

      {/* Formulario de inicio de sesión */}
      <form onSubmit={handleLogin} className="flex flex-col gap-6 border rounded-lg border-Color4 bg-Color5 px-6 py-6 w-98">

        {/* Campo de correo electrónico */}
        <Input
          name="email" 
          type="email"
          title="Correo Electrónico"
          value={form.email}
          onChange={handleChange}
          placeholder="ejemplo@gmail.com"
          required
        />

        {/* Campo de contraseña */}
        <Input
          name="password" 
          type="password"
          title="Contraseña"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />

        {/* Checkbox de "Recordar contraseña" */}
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            className="w-5 h-5 accent-green-600 rounded"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <h4>Recordar contraseña</h4>
        </div>

        {/* Botón de inicio de sesión */}
        <button
          type="submit"
          className={`rounded-lg px-18 py-2.5 text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-Color1 hover:bg-Color1/90"
          }`}
          disabled={loading}
        >
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>

        {/** Enlace a la página de registro */}
        <a href="/register" className="text-center underline text-Color1">Registrarse</a>
      </form>
    </div>
  );
}