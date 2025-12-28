/// <summary>
/// Controlador para la autenticación y gestión de usuarios.
/// </summary>

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Back_End.Application.DTO;
using Back_End.Application.Services.Interfaces;

namespace Back_End.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        /// <summary>
        /// Inicia sesión y genera un token JWT para el usuario.
        /// </summary>
        /// <param name="request">
        /// Objeto que contiene las credenciales del usuario (email y contraseña).
        /// </param>
        /// <returns>
        /// Un objeto que contiene el token JWT y la información del usuario si las credenciales son válidas;
        /// </returns>
        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto request)
        {
            try
            {
                var user = await _authService.ValidateUserAndGetUser(request);
                if (user == null)
                    return Unauthorized(new { message = "Credenciales inválidas" });

                // Generar token (que incluye obtener el rol internamente)
                var token = await _authService.GenerateJwtTokenAsync(user);

                // Obtener el rol del usuario por separado para la respuesta
                var userRole = await _authService.GetUserRole(user);

                return Ok(new
                {
                    token,
                    user = new
                    {
                        id = user.Id,
                        nombre = user.Name,
                        email = user.Email,
                        role = userRole
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Registra un nuevo usuario.
        /// </summary>
        /// <param name="request">
        /// Objeto que contiene la información del usuario a registrar.
        /// </param>
        /// <returns>
        /// Un mensaje de éxito si el registro es exitoso; de lo contrario, un mensaje de error con detalles.
        /// </returns>

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto request)
        {
            try
            {
                var result = await _authService.RegisterUser(request);
                if (result.Succeeded)
                    return Ok(new { message = "Usuario registrado exitosamente" });

                // En caso de error, devolver los errores específicos
                return BadRequest(new
                {
                    message = "Error al registrar usuario",
                    errors = result.Errors.Select(e => e.Description)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Actualiza el perfil del usuario autenticado.
        /// </summary>
        /// <param name="request">
        /// Objeto que contiene la información del perfil a actualizar.
        /// </param>
        /// <returns>
        /// Un mensaje de éxito si la actualización es exitosa; de lo contrario, un mensaje de error con detalles.
        /// </returns>

        [Authorize]
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserDto request)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                    return Unauthorized();

                // Actualizar el perfil del usuario
                var updated = await _authService.UpdateUserProfile(userId, request);
                if (!updated)
                    return NotFound(new { message = "Usuario no encontrado" });

                return Ok(new { message = "Perfil actualizado correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Obtiene el perfil del usuario autenticado.
        /// </summary>
        /// <returns>
        /// Un objeto que contiene la información del perfil del usuario.
        /// </returns>

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized("User not authenticated.");

                // Obtener el perfil del usuario
                var user = await _authService.GetUserByIdAsync(userId);
                if (user == null)
                    return NotFound();

                return Ok(new
                {
                    nombre = user.Name,
                    apellido = user.Lastname,
                    telefono = user.PhoneNumber,
                    provincia = user.Province,
                    municipio = user.Municipality,
                    codigoPostal = user.Postal_Code,
                    calle = user.Street,
                    email = user.Email
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }
    }
}