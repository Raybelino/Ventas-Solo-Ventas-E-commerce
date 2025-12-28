import { useEffect, useState } from "react";
import Input from "../../components/common/Input";
import { getUserProfile, updateUserProfile } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { data } from "../../data/region";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

/**
 * Manejo del perfil de usuario.
 * 
 * Renderiza un formulario para editar el perfil del usuario.
 * 
 * Funcionalidades:
 * - Carga de datos del perfil.
 * - Edición de datos del perfil.
 * - Validación de campos.
 */
export default function EditProfile() {

  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    provincia: "",
    municipio: "",
    codigoPostal: "",
    calle: ""
  });

  // Estado de municipios
  const [municipios, setMunicipios] = useState([]);

  // Estado de mensajes
  const [message, setMessage] = useState("");

  // Hook para la navegación
  const navigate = useNavigate();

  // Efecto para cargar los datos del perfil
  useEffect(() => {
    async function fetchProfile() {
      try {
        const DataUser = await getUserProfile();
        setForm({
          nombre: DataUser.nombre,
          apellido: DataUser.apellido,
          correo: DataUser.email,
          telefono: DataUser.telefono,
          provincia: DataUser.provincia,
          municipio: DataUser.municipio,
          codigoPostal: DataUser.codigoPostal,
          calle: DataUser.calle
        });
        setMunicipios(data[DataUser.provincia] ?? []);
      } catch (err) {
        console.error("Error al obtener perfil", err);
        setMessage("Error al cargar los datos del perfil.");
      }
    }
    fetchProfile();
  }, []);

  /** 
   * Maneja los cambios en los campos del formulario.
   * @param {object} e - El evento de cambio.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === "provincia") {
      const nuevos = data[value] ?? [];
      setMunicipios(nuevos);
      setForm((prev) => ({ ...prev, municipio: "" }));
    }
  };

  /**
   * Maneja el envío del formulario.
   * @param {object} e - El evento de envío.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const UserDataUpdate = {
        nombre: form.nombre,
        apellido: form.apellido,
        telefono: form.telefono,
        provincia: form.provincia,
        municipio: form.municipio,
        codigoPostal: form.codigoPostal,
        calle: form.calle
      };

      await updateUserProfile(UserDataUpdate);
      setMessage("Perfil actualizado correctamente.");
      setTimeout(() => navigate("/"), 1500); // Redirige al home
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      setMessage("Error al actualizar perfil.");
    }
  };

  return (
    <>

      {/* Encabezado */}
      <Header/>
      <div className="flex flex-col items-center justify-center py-7 bg-Fondo">
        <h2 className="text-4xl font-bold mb-6">Editar Perfil</h2>

        {/* Mensaje de error o éxito */}
        {message && (
          <div className="mb-4 text-center text-white bg-blue-500 px-4 py-2 rounded-lg">
            {message}
          </div>
        )}

        {/* Formulario de edición */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 bg-Color5 p-6 border-2 border-neutral-300 rounded-lg w-3xl">

          {/* Nombre */}
          <Input title="Nombre" name="nombre" value={form.nombre} onChange={handleChange} />

          {/* Apellido */}
          <Input title="Apellido" name="apellido" value={form.apellido} onChange={handleChange} />

          {/* Correo electrónico */}
          <Input title="Correo electrónico" name="correo" value={form.correo} onChange={handleChange} disabled />

          {/* Teléfono */}
          <Input title="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />

          {/* Provincia */}
          <div>
            <h4 className="h-9">Provincia</h4>
              <select
                name="provincia"
                className="bg-white border border-neutral-300 rounded-lg px-2 py-2.5 w-full"
                value={form.provincia}
                onChange={handleChange}
              >
                <option value="">Selecciona una provincia</option>
                {Object.keys(data).map((prov) => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
          </div>

          {/* Código Postal */}
          <Input title="Código Postal" name="codigoPostal" value={form.codigoPostal} onChange={handleChange} />

          {/* Municipio */}
          <div>
            <h4 className="h-9">Municipio</h4>
              <select
                name="municipio"
                className="bg-white border border-neutral-300 rounded-lg px-2 py-2.5 w-full"
                value={form.municipio}
                onChange={handleChange}
              >
                <option value="">Selecciona un municipio</option>
                {municipios.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
          </div>

          {/* Calle */}
          <Input title="Calle" name="calle" value={form.calle} onChange={handleChange} />

          {/* Botón de guardar cambios */}
          <button type="submit" className="col-span-2 h-12 bg-Color1 text-white rounded-lg hover:bg-Color1/90">
            Guardar Cambios
          </button>
        </form>
      </div>

      {/* Footer */}
      <Footer/>
    </>
  );
}