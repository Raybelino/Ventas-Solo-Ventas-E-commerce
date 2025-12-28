import { useState } from "react";
import Input from "../../components/common/Input";
import { register } from "../../services/authService";
import { data } from "../../data/region";
import { useNavigate } from "react-router-dom";

/**
 * Componente de registro de usuario.
 *
 * Renderiza un formulario de registro y maneja la creación de nuevos usuarios.
 *
 * Funcionalidades:
 * - Validación de campos.
 * - Manejo de errores en el registro.
 * - Selección de provincia y municipio.
 * - Registro exitoso de nuevos usuarios.
 */

export default function Register() {

  // Hook para la navegación
  const navigate = useNavigate();

  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    telefono: "",
    provincia: "",
    municipio: "",
    codigoPostal: "",
    calle: ""
  });

  // Estado de validación
  const [obligatorios, setObligatorios] = useState({});

  // Estado de errores de contraseña
  const [erroresContrasena, setErroresContrasena] = useState([]);

  // Estado de municipios
  const [municipios, setMunicipios] = useState([]);

  // Estado de mensajes
  const [message, setMessage] = useState("");

  // Estado de carga
  const [loading, setLoading] = useState(false);


  /**
   * Maneja los cambios en los campos del formulario.
   * @param {object} e - El evento de cambio.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== '') {
      setOblicatorios(prev => ({ ...prev, [name]: false }));
    }

    if (name === "provincia") {
      const nuevosMunicipios = data[value] ?? [];
      setMunicipios(nuevosMunicipios);
      setForm((prev) => ({ ...prev, municipio: "" }));
    }
  };

  /**
   * Valida la contraseña del usuario.
   * @param {string} contrasena - La contraseña a validar.
   * @returns {Array} - Un array con los mensajes de error encontrados.
   */
  const validarContrasena = (contrasena) => {
    const errores = [];
    if (contrasena.length < 6) errores.push("Debe tener al menos 6 caracteres.");
    if (!/[a-z]/.test(contrasena)) errores.push("Debe contener al menos una letra minúscula.");
    if (!/[A-Z]/.test(contrasena)) errores.push("Debe contener al menos una letra mayúscula.");
    if (!/[0-9]/.test(contrasena)) errores.push("Debe contener al menos un número.");
    if (!/[^A-Za-z0-9]/.test(contrasena)) errores.push("Debe contener al menos un carácter especial.");
    return errores;
  };

  /**
   * Valida los campos del formulario.
   * @returns {Array} - Un array con los nombres de los campos vacíos.
   */
  const validarCampos = () => {
    const vacios = Object.keys(form).filter(campo => form[campo].trim() === "");
  
    const nuevos = {};
    vacios.forEach(campo => nuevos[campo] = true);
    setOblicatorios(nuevos);

    return vacios;
  }

  /**
   * Maneja el envío del formulario.
   * Función asíncrona que valida los campos y envía los datos de registro.
   */
  const handleSubmit = async () => {

    const vacios = validarCampos();
    const errorcontraseña = validarContrasena(form.contrasena);
    setErroresContrasena(validarContrasena(form.contrasena));

    if(errorcontraseña.length > 0 || vacios.length > 0){
      setMessage("Faltan campos por completar o la contraseña esta mal");
      setLoading(false);
      return;
    }
    setMessage("");
    setLoading(true);

    try {
      const body = {
      name: form.nombre,
      lastname: form.apellido,
      email: form.correo,
      password: form.contrasena,
      phonenumber: form.telefono,
      province: form.provincia,
      municipality: form.municipio,
      postal_Code: form.codigoPostal,
      street: form.calle
      };

      await register(body);

      setMessage("¡Registro exitoso!");
      navigate("/login");

    } catch (error) {
      setLoading(false);
      const errores = JSON.parse(error.message);
      const Gmail = errores.errors[0].split("'")[1];
      const errorMessange = "El correo electronico " + Gmail + " ya existe";  
      setMessage(errorMessange);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      {/* Logo */}
      <div className="text-center">      
        <h1 className="text-Color1 font-bold text-8xl">Ventas</h1>
        <h3 className="text-Color1 text-4xl">Solo Ventas</h3>
      </div>

      {/* Mensajes de error */}
        {message && (
          <div className="px-4 py-2 rounded-lg bg-red-100 text-red-700">
            {message}
          </div>
        )}

      {/* Formulario de registro */}
      <div className="grid grid-cols-2 gap-5 border rounded-lg border-Color4 bg-Color5 px-6 py-6 w-174 h-180">
        
        {/* Nombre */}
        <Input title="Nombre" name="nombre" placeholder="" value={form.nombre} isObligatory={obligatorios.nombre} onChange={handleChange} />
        
        {/* Apellido */}
        <Input title="Apellido" name="apellido" placeholder="" value={form.apellido} isObligatory={obligatorios.apellido} onChange={handleChange} />

        {/* Correo electrónico */}
        <Input title="Correo electrónico" name="correo" placeholder="" value={form.correo} isObligatory={obligatorios.correo} onChange={handleChange} />
        
        {/* Contraseña */}
        <div>
          {erroresContrasena && erroresContrasena.length > 0 && (
            <div className="absolute translate-x-90 translate-y-5 bg-Color5 border rounded-lg border-Color1 p-3 text-red-700">
              <div className="align-text-top">
                {erroresContrasena.map((error, i) => (
                  <p key={i} className="mb-1">• {error}</p>
                ))}
              </div>
            </div>
          )}
          <Input title="Contraseña" name="contrasena" placeholder="" value={form.contrasena} isObligatory={obligatorios.contrasena} onChange={handleChange} />
        </div>

        {/* Teléfono */}
        <Input title="Teléfono" name="telefono" placeholder="" value={form.telefono} isObligatory={obligatorios.telefono} onChange={handleChange} />

        {/* Provincia */}
        <div>
          <div className="flex gap-5"> 
            <h4 className="h-9">Provincia</h4>
            {obligatorios.provincia ? <h4 className="text-red-700">* Obligatorio</h4> : ""}
          </div>
          <select
            name="provincia"
            className={`bg-white rounded-lg border border-gray-300 outline-none px-2 py-2.5 w-full ${
              form.provincia ? "text-black" : "text-gray-400"
            }`}
            value={form.provincia}
            onChange={handleChange}
          >
            <option value="">Selecciona una provincia</option>
            {Object.keys(data).map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>

        {/* Código Postal */}
        <Input title="Código Postal" name="codigoPostal" placeholder="" value={form.codigoPostal} isObligatory={obligatorios.codigoPostal} onChange={handleChange} />

        {/* Municipio */}
        <div>
          <div className="flex gap-5">
            <h4 className="h-9">Municipio</h4>
            {obligatorios.municipio ? <h4 className="text-red-700">* Obligatorio</h4> : ""}
          </div>
          <select
            name="municipio"
            className={`bg-white rounded-lg border border-gray-300 outline-none px-2 py-2.5 w-full ${
              form.municipio ? "text-black" : "text-gray-400"
            }`}
            value={form.municipio}
            onChange={handleChange}
          >
            <option value="">Selecciona un municipio</option>
            {municipios.map((mun) => (
              <option key={mun} value={mun}>
                {mun}
              </option>
            ))}
          </select>
        </div>

        {/* Calle */}
        <Input title="Calle" name="calle" placeholder="Calle..#.." value={form.calle} isObligatory={obligatorios.calle} onChange={handleChange} className="col-span-2" />

        {/* Botón de Registro */}
        <button
          className={`col-span-2 rounded-lg px-18 py-2.5 text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-Color1 hover:bg-Color1/90"
          }`}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>

        {/* Enlace a Iniciar sesión */}
        <a href="/login" className="col-span-2 text-center underline text-Color1">Iniciar sesión</a>
      </div>
    </div>
  );
}