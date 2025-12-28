import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Product from "../components/product/Product";
import { getProducts } from "../services/productService";
import { getUserRole } from "../services/authService";

/**
 * Componente principal de la página de inicio.
 *
 * Renderiza la lista de productos y permite filtrar por categoría y buscar por nombre.
 * 
 * Funcionalidades:
 * - Mostrar productos
 * - Filtrar productos por categoría
 * - Buscar productos por nombre
 */
export default function Home() {

  // Estados para los productos
  const [products, setProducts] = useState([]);

  // Estado para el rol del usuario
  const [role, setRole] = useState(null);

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para el filtro de categoría
  const [categoryFilter, setCategoryFilter] = useState("Todo");

  // Hook para la navegación
  const navigate = useNavigate();

  // Efecto para obtener productos y rol de usuario
  useEffect(() => {
      getProducts().then((data) => setProducts(data));
      const userRole = getUserRole();
      setRole(userRole);
  }, []);

  /* Filtra los productos según el término de búsqueda y la categoría seleccionada. */
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "Todo" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <>

      {/* Encabezado */}
      <Header onSearch={setSearchTerm} />
      <div className="p-5 flex flex-col gap-10 bg-Fondo">
        
        {/* Botones de filtro */}
        <div className="flex px-10 gap-3 flex-wrap justify-center">
          {["Todo", "Tecnología", "Ropa", "Hogar", "Otros"].map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`rounded-xl h-10 border-2 w-40 cursor-pointer ${
                categoryFilter === category
                  ? "bg-Color1 text-white border-Color1"
                  : "border-neutral-300 hover:bg-Color5"
              }`}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div
          className="grid gap-10 place-items-center mx-5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
        >
          
          {/* Botón flotante para admin */}
          {role === "Admin" && (
            <div className="fixed bottom-7 right-7 flex flex-col items-center gap-4 z-50">

              {/* Botón para ir al dashboard */}
              <button
                className="flex flex-col items-center justify-center rounded-full h-16 w-16 bg-red-600 text-white text-3xl shadow-lg hover:bg-red-700 cursor-pointer transition"
                onClick={(() => navigate("/dashboard"))}
                title="Eliminar producto"
              >
                <img className="w-10" src="../../../public/casual/dashboard.svg" alt="Dashboard" />
              </button>

              {/* Botón para agregar producto */}
              <button
                className="rounded-full h-20 border-1 w-20 bg-Color1 border-gray-300 hover:bg-green-600 cursor-pointer transition"
                onClick={() => navigate("/addproduct")}
                type="button"
              >
                <span className="text-white text-6xl absolute -translate-x-5 -translate-y-9">+</span>
              </button>
            </div>
          )}

          {/* Lista de productos */}
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Product
                key={product.id}
                productId={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.imagePath}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No se encontraron productos
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}