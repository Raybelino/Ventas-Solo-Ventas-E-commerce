import { useNavigate } from "react-router-dom";

/**
 * Componente de pie de página.
 *
 * Muestra información de contacto y enlaces a redes sociales.
 *
 * Funcionalidades:
 * - Navegación a la página de inicio
 * - Enlaces a redes sociales
 * - Información de contacto
 */
export default function Footer() {

    // Hook para la navegación
    const navigate = useNavigate();

return (
    <div className="flex gap-30 p-5 border-t-2 border-gray-300">
        <div className="flex flex-col items-start justify-start gap-5">

            {/** Logo y nombre de la empresa */}
            <div className="text-center mx-5 cursor-pointer" onClick={() => navigate("/")}>
                <h1 className="text-Color1 font-bold text-2xl">Ventas</h1>
                <h3 className="text-Color1 text-xl">Solo Ventas</h3>
            </div>       

            {/** Enlaces a redes sociales */}
            <div className="flex items-center gap-4 ml-5">
                <a href="www.x.com">
                    <img src="../../../public/footer/x.svg" alt="x" />
                </a>
                <a href="www.instagram.com">
                    <img src="../../../public/footer/instagram.svg" alt="instagram" />
                </a>
                <a href="www.youtube.com">
                    <img src="../../../public/footer/youtube.svg" alt="youtube" />
                </a>
                <a href="www.likedin.com">
                    <img src="../../../public/footer/likedin.svg" alt="likedin" />
                </a>
            </div>
        </div>

        {/* Información de contacto */}
        <div className="flex flex-col gap-3">
            <strong className="text-2xl mb-4">Contactos</strong>
            <a href="" className="text-Color1">Whatsapp</a>
            <a href="" className="text-Color1">Correo Electronico</a>
        </div>
    </div>
)};