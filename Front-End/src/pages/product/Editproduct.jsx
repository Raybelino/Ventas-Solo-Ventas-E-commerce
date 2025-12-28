import { useState, useEffect } from 'react';
import { getProductById, updateProduct } from '../../services/productService';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Input from '../../components/common/Input';

/**
 * Componente para editar un producto existente.
 *
 * Renderiza un formulario con los datos del producto a editar.
 * 
 * Funcionalidades:
 * - Carga de datos del producto a editar.
 * - Validación de campos.
 * - Manejo de errores.
 */
export default function EditProduct() {

  // Obtener el ID del producto de la URL
  const { id } = useParams();

  // Hook para redireccionar
  const navigate = useNavigate();
  
  // Estado de carga
  const [loading, setLoading] = useState(false);

  // Estado de mensajes
  const [message, setMessage] = useState('');

  // Estado del formulario
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryID: '',
    imagen: null,
    imagePath: ''
  });

  // Efecto para cargar los datos del producto
  useEffect(() => {
    /**
     * Función para cargar los datos del producto desde el servicio.
     */
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setForm({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          categoryID: data.categoryID,
          imagen: null,
          imagePath: data.imagePath || ''
        });
      } catch (error) {
        setMessage('Error al cargar el producto.');
      }
    };

    // Llamar a la función para cargar el producto
    fetchProduct();
  }, [id]);

  /**
   * Maneja los cambios en los campos del formulario.
   * @param {Event} e - El evento de cambio.
   */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setForm(prev => ({
        ...prev,
        imagen: files[0] || null
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  /**
   * Maneja el envío del formulario.
   */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage('');

      await updateProduct(id, form);
      setMessage('Producto actualizado exitosamente');
      setTimeout(() => navigate('/productos'), 1500);
    } catch (error) {
      console.error('Error actualizando producto:', error);
      setMessage('Error al actualizar el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      {/* Encabezado */}
      <Header />
      <div className="flex flex-col items-center justify-start py-7 gap-12 bg-Fondo">
        <h1 className="font-bold text-5xl">Editar Producto</h1>

        {/* Mensaje de estado */}
        {message && (
          <div className={`px-4 py-2 rounded-lg ${
            message.includes('exitosamente') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {/* Formulario de edición del producto */}
        <div className="flex flex-col gap-6 border rounded-lg border-Color4 bg-Color5 px-6 py-6 w-174 h-auto">

          {/* Nombre */}
          <Input title="Nombre del producto" name="name" value={form.name} onChange={handleChange} />

          {/* Descripción */}
          <Input title="Descripción" name="description" value={form.description} onChange={handleChange} />

          {/* Precio */}
          <Input title="Precio" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} />

          {/* Cantidad */}
          <Input title="Cantidad" name="stock" type="number" value={form.stock} onChange={handleChange} />

          {/* Categoría */}
          <div>
            <h4 className="h-9">Categoría</h4>
            <select
              name="categoryID"
              value={form.categoryID}
              onChange={handleChange}
              className="bg-white rounded-lg border border-gray-300 outline-none px-2 py-2.5 w-full"
            >
              <option value="">Selecciona una categoría</option>
              <option value="1">Inmuebles</option>
              <option value="2">Vehículo</option>
              <option value="3">Tecnología</option>
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
            {/* Vista previa de la imagen */}
            {form.imagePath && (
              <img
                src={form.imagePath.startsWith('http') ? form.imagePath : `https://localhost:7054${form.imagePath}`}
                alt="Vista previa"
                className="mt-2 max-w-xs border border-gray-300 rounded"
              />
            )}
          </div>

          {/* Botón de envío */}
          <button
            className={`h-15 rounded-lg text-white ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-Color1 hover:bg-Color1/90'
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Actualizando...' : 'Actualizar Producto'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}