import api from '../api/axios';

/**
 * Obtiene todos los productos.
 *
 * @returns {Promise<Array>} - Una promesa que se resuelve con la lista de productos.
 */
export const getProducts = async () => {
  try {
    const response = await api.get('/Products');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    return [];
  }
};

/**
 * Añade un nuevo producto.
 *
 * @param {Object} productData - Los datos del producto a añadir.
 * @returns {Promise<Object>} - Los datos del producto creado.
 */
export const addProduct = async (productData) => {
  try {
    console.log('Datos del producto a enviar:', productData);

    let imageUrl = '';
    if (productData.imagen && productData.imagen instanceof File) {
      const formData = new FormData();
      formData.append('file', productData.imagen);

      const imageResponse = await api.post('/Products/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      imageUrl = imageResponse.data.imagePath;
    }

    const productPayload = {
      name: productData.name,
      description: productData.description,
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock),
      category: productData.category,
      imagePath: imageUrl
      ? imageUrl.startsWith('http')
        ? imageUrl
        : `https://localhost:7054${imageUrl}`
      : ''
    };

    const response = await api.post('/Products', productPayload);
    return response.data;
  } catch (error) {
    console.error('Error completo:', error);
    throw error;
  }
};

/**
 * Obtiene un producto por ID.
 *
 * @param {Number} id - El ID del producto.
 * @returns {Promise<Object>} - Los datos del producto.
 */
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/Products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo producto:', error);
    throw error;
  }
};

/**
 * Actualiza un producto por ID.
 *
 * @param {Number} id - El ID del producto.
 * @param {Object} productData - Los nuevos datos del producto.
 * @returns {Promise<Object>} - Los datos del producto actualizado.
 */
export const updateProduct = async (id, productData) => {
  try {
    let imageUrl = productData.imagePath || '';

    if (productData.imagen && productData.imagen instanceof File) {
      const formData = new FormData();
      formData.append('file', productData.imagen);

      const imageResponse = await api.post('/Products/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      imageUrl = imageResponse.data.imagePath.startsWith('http')
        ? imageResponse.data.imagePath
        : `https://localhost:7054${imageResponse.data.imagePath}`;
    }

    const productPayload = {
      Id: parseInt(id),
      Name: productData.name,
      Description: productData.description,
      Price: parseFloat(productData.price),
      Stock: parseInt(productData.stock),
      CategoryID: parseInt(productData.categoryID),
      imagePath: imageUrl
    };

    const response = await api.put(`/Products/${id}`, productPayload);
    return response.data;
  } catch (error) {
    console.error('Error actualizando producto:', error);
    throw error;
  }
};

/**
 * Elimina un producto por ID.
 *
 * @param {Number} id - El ID del producto.
 * @returns {Promise<boolean>} - Verdadero si la eliminación fue exitosa.
 */
export const deleteProduct = async (id) => {
  try {
    await api.delete(`/Products/${id}`);
    return true;
  } catch (error) {
    console.error('Error eliminando producto:', error);
    throw error;
  }
};