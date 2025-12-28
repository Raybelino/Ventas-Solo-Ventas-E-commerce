/// <summary>
/// Servicio para la autenticación y gestión de usuarios.
/// </summary>

using Back_End.Application.DTO;
using Back_End.Application.Services.Interfaces;
using Back_End.Domain.Entities;
using Back_End.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Back_End.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _repository;
        private readonly JwtSettingsDTO _jwtSettings;
        public AuthService(IAuthRepository repository, IOptions<JwtSettingsDTO> jwtOptions)
        {
            _repository = repository;
            _jwtSettings = jwtOptions.Value;
        }

        /// <inheritdoc/>
        public async Task<string> GenerateJwtTokenAsync(ApplicationUser user)
        {
            // VALIDACIONES CRÍTICAS
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            if (_jwtSettings == null)
                throw new InvalidOperationException("JwtSettings no está configurado");

            if (string.IsNullOrWhiteSpace(_jwtSettings.Key))
                throw new InvalidOperationException("JWT Key no puede estar vacía");

            if (string.IsNullOrWhiteSpace(_jwtSettings.Issuer))
                throw new InvalidOperationException("JWT Issuer no puede estar vacío");

            if (string.IsNullOrWhiteSpace(_jwtSettings.Audience))
                throw new InvalidOperationException("JWT Audience no puede estar vacío");

            // CREACIÓN DE CLAIMS
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id ?? ""),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                new Claim(ClaimTypes.NameIdentifier, user.Id ?? ""),
                new Claim(ClaimTypes.Name, user.UserName ?? user.Email ?? ""),
                new Claim(ClaimTypes.Email, user.Email ?? ""),
                new Claim("Name", user.Name ?? ""),
                new Claim("Email", user.Email ?? "")
            };

            // INTENTO DE GENERACIÓN DEL TOKEN
            try
            {
                // Obtener el rol del usuario
                var userRole = await GetUserRole(user);

                if (!string.IsNullOrEmpty(userRole))
                {
                    claims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                // Crear el token JWT
                var token = new JwtSecurityToken(
                    issuer: _jwtSettings.Issuer,
                    audience: _jwtSettings.Audience,
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutes),
                    signingCredentials: creds
                );

                // Retornar el token como una cadena
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error generando JWT token: {ex.Message}", ex);
            }
        }

        /// <inheritdoc/>
        public async Task<IdentityResult> RegisterUser(RegisterUserDto request)
        {
            if (request == null)
                throw new InvalidOperationException("Se a enviado mal los datos desde la interfaz");

            // Crear el usuario
            var user = new ApplicationUser
            {
                Name = request.Name,
                Lastname = request.Lastname,
                UserName = request.Email,
                Email = request.Email,
                PhoneNumber = request.Phonenumber,
                Province = request.Province,
                Municipality = request.Municipality,
                Postal_Code = request.Postal_Code,
                Street = request.Street
            };

            if (request.Password == null)
                throw new InvalidOperationException("No se ha registrado la contraseña");

            var result = await _repository.RegisterAsync(user, request.Password);

            // Asignar el rol "Usuario" al nuevo usuario si el registro fue exitoso
            if (result.Succeeded)
            {
                var roleResult = await _repository.AssignRoleToUserAsync(user, "Usuario");
                if (!roleResult.Succeeded)
                {
                    Console.WriteLine($"Error asignando rol: {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
                }
            }

            // Retornar el resultado de la operación
            return result;
        }

        /// <inheritdoc/>
        public async Task<ApplicationUser?> ValidateUserAndGetUser(LoginUserDto request)
        {
            // Validar el DTO de entrada
            if (request == null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                return null;

            var user = await _repository.FindByEmailAsync(request.Email);

            if (user == null) 
                return null;

            var isValid = await _repository.CheckPasswordAsync(user, request.Password);

            // Retornar el usuario si las credenciales son válidas; de lo contrario, null
            return isValid ? user : null;
        }

        /// <inheritdoc/>
        public async Task<string?> GetUserRole(ApplicationUser user)
        {
            if (user == null) 
                return null;

            var roles = await _repository.GetUserRolesAsync(user);

            // Retornar el primer rol encontrado o null si no tiene roles
            return roles == null ? null : roles.FirstOrDefault();

        }

        /// <inheritdoc/>
        public async Task<bool> UpdateUserProfile(string userId, UpdateUserDto dto)
        {
            var user = await _repository.GetByIdAsync(userId);

            if (user == null)
                return false;

            // Actualizar los campos del usuario con los valores del DTO
            user.Name = dto.Nombre;
            user.Lastname = dto.Apellido;
            user.PhoneNumber = dto.Telefono;
            user.Province = dto.Provincia;
            user.Municipality = dto.Municipio;
            user.Postal_Code = dto.CodigoPostal;
            user.Street = dto.Calle;

            // Guardar los cambios en el repositorio
            return await _repository.UpdateAsync(user);
        }

        /// <inheritdoc/>
        public async Task<ApplicationUser?> GetUserByIdAsync(string userId)
        {
            // Validar el ID del usuario
            return await _repository.GetByIdAsync(userId);
        }
    }
}