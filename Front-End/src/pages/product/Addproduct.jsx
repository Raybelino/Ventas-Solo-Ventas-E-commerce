import { useState } from 'react';
import { addProduct } from '../../services/productService';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Input from '../../components/common/Input';

/**
 * Componente para añadir un nuevo producto.
 *
 * Renderiza un formulario para la creación de un nuevo producto.
 *
 * Funcionalidades:
 * - Validación de campos.
 * - Manejo de errores.
 * - Subida de imágenes. 
 */
export default function AddProduct() {

  // Estado del formulario
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    imagen: null
  });

  // Estado de carga
  const [loading, setLoading] = useState(false);

  // Estado de mensajes
  const [message, setMessage] = useState('');

  /**
   * Maneja los cambios en los campos del formulario.
   * @param {Object} e - Evento del cambio en el input.
   */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'imagen') {
      setForm(prev => ({
        ...prev,
        [name]: files[0] || null
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  /**
   * Valida el formulario.
   * @returns {Array} - Array de mensajes de error.
   */
  const validateForm = () => {
    const errors = [];

    if (!form.name.trim()) errors.push('El nombre del producto es requerido');
    if (!form.description.trim()) errors.push('La descripción es requerida');
    if (!form.price || isNaN(form.price) || parseFloat(form.price) <= 0) {
      errors.push('El precio debe ser un número mayor a 0');
    }
    if (!form.stock || isNaN(form.stock) || parseInt(form.stock) < 0) {
      errors.push('El stock debe ser un número mayor o igual a 0');
    }
    if (!form.category) errors.push('Debe seleccionar una categoría');

    return errors;
  };

  /**
   * Maneja el envío del formulario.
   * @param {Event} e - Evento del envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage('');

      const errors = validateForm();
      if (errors.length > 0) {
        setMessage('Errores: ' + errors.join(', '));
        return;
      }

      await addProduct(form);

      setForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        imagen: null
      });

      const fileInput = document.querySelector('input[name="imagen"]');
      if (fileInput) fileInput.value = '';

      setMessage('Producto añadido exitosamente');

    } catch (error) {
      console.error('Error al añadir producto:', error);
      setMessage('Error al añadir el producto. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      {/* Encabezado */}
      <Header />
      <div className="flex flex-col items-center justify-start py-7 gap-12 bg-Fondo">
        <div className="text-center">
          <h1 className="font-bold text-5xl">Añadir Productos</h1>
        </div>

        {/* Mensajes de error o éxito */}
        {message && (
          <div className={`px-4 py-2 rounded-lg ${
            message.includes('exitosamente') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 border rounded-lg border-Color4 bg-Color5 px-6 py-6 w-174 h-auto">

          {/* Nombre del producto */}
          <Input
            title="Nombre del producto"
            name="name"
            placeholder="Ingresa el nombre del producto"
            value={form.name}
            onChange={handleChange} 
          />

          {/* Descripción */}
          <Input
            title="Descripción"
            name="description"
            placeholder="Describe el producto"
            value={form.description}
            onChange={handleChange} 
          />

          {/* Precio */}
          <Input
            title="Precio"
            name="price"
            placeholder="Ingresa el precio"
            value={form.price}
            onChange={handleChange}
            type="number"
            step="0.01"
          />

          {/* Stock */}
          <Input
            title="Stock"
            name="stock"
            placeholder="Ingresa el stock disponible"
            value={form.stock}
            onChange={handleChange}
            type="number"
          />

          {/* Categoría */}
          <div>
            <h4 className="h-9">Categoría</h4>
            <select
              name="category"
              className={`bg-white rounded-lg border border-gray-300 outline-none px-2 py-2.5 w-full ${
                form.category ? "text-black" : "text-gray-400"
              }`}
              onChange={handleChange}
              value={form.category}
            >
              <option value="">Selecciona una categoría</option>
              <option value="Otros">Otros</option>
              <option value="Hogar">Hogar</option>
              <option value="Ropa">Ropa</option>
              <option value="Tecnología">Tecnología</option>
            </select>
          </div>

          {/* Imagen */}
          <div>
            <h4 className="h-9">Imagen</h4>
            <input
              type="file"
              name="imagen"
              accept="image/*"
              onChange={handleChange}
              className="bg-white rounded-lg border border-gray-300 outline-none px-2 py-2.5 w-full"
            />
          </div>

          {/* Botón de añadir producto */}
          <button
            type="submit"
            className={`col-span-2 h-15 rounded-lg text-white ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-Color1 hover:bg-Color1/90'
            }`}
            disabled={loading}
          >
            {loading ? 'Añadiendo...' : 'Añadir producto'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};