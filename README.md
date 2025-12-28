# **Ventas Solo Ventas** 

## **Descripción**  
**Ventas Solo Ventas** es un e-commerce desarrollado con React + TailwindCSS en el frontend y ASP.NET Core en el backend.  

La aplicación permite a los usuarios registrarse, iniciar sesión, explorar productos, añadirlos al carrito, realizar pedidos y gestionar su cuenta de forma sencilla.  

El objetivo principal es ofrecer una experiencia de compra rápida, intuitiva y segura, integrando las mejores prácticas de desarrollo web moderno.  

---

## **Características principales**  
- **Autenticación de usuarios** (registro, login, logout, recordar contraseña).  
- **Carrito de compras dinámico** con actualización en tiempo real.  
- **Procesamiento de pagos** (integración planificada con pasarelas).  
- **Gestión de pedidos** (crear, ver historial, seguimiento).  
- **Sistema de reseñas y valoraciones** por producto.  
- **Interfaz responsive** optimizada para móviles y escritorio.  
- **UI moderna** con **TailwindCSS** y componentes reutilizables.  

---

## **Tecnologías utilizadas**  

### **Frontend** 
- **React:** Librería para la construcción de interfaces.  
- **TailwindCSS:** Estilos rápidos y personalizables.  
- **Axios / Fetch API:** Consumo de endpoints del backend.  
- **React Router DOM:** Manejo de rutas y navegación.  

### **Backend**  
- **ASP.NET Core Web API:** Gestión de la lógica y endpoints REST.  
- **Entity Framework Core:** ORM para interacción con la base de datos.  
- **SQL Server:** Base de datos relacional.  

### **Otros**
- **JWT (JSON Web Token):** Seguridad y control de sesiones.  

---

## **Instalación y configuración**   

1. **Clonar el repositorio**  
    ````bash
    git clone https://github.com/usuario/ventas-solo-ventas.git
    cd ventas-solo-ventas

2. **Configurar el backend**  
    ````bash
    cd Back_End
    dotnet restore
    dotnet ef database update   # Generar base de datos
    dotnet run

3. **Configurar el frontend**  
    ````bash
    cd Front_End
    npm install
    npm run dev

4. **Acceder a la aplicación**  
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5211

## **Estructura del proyecto**  
### **Backend – Clean Architecture**
    Back-End/
    │── Application/        # Casos de uso (lógica de aplicación)
    │── Domain/             # Entidades y reglas de negocio
    │── Infrastructure/     # Acceso a datos, repositorios, EF Core
    └── Presentation/       # API (Controllers, Middlewares, etc.)

### **Frontend – React**
    Front-End/
    │── public/             # Archivos estáticos
    │── src/
    │   ├── api/            # Conexiones a la API
    │   ├── components/     # Componentes reutilizables
    │   ├── data/           # Datos mockeados
    │   ├── pages/          # Páginas principales (Login, Home, Register, etc.)
    │   ├── services/       # Servicios y lógica de negocio cliente
    │   ├── App.jsx         # Punto de entrada de la app
    │   ├── main.jsx        # Render principal
    │   └── style.css       # Estilos globales