/// <summary>
/// Repositorio para la gestión de autenticación y autorización de usuarios.
/// </summary>

using Back_End.Domain.Entities;
using Back_End.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Back_End.Infrastructure.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public AuthRepository(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        /// <inheritdoc/>
        public async Task<IdentityResult> RegisterAsync(ApplicationUser user, string password) =>
            await _userManager.CreateAsync(user, password);

        /// <inheritdoc/>
        public async Task<bool> CheckPasswordAsync(ApplicationUser user, string password) => 
            await _userManager.CheckPasswordAsync(user, password);

        /// <inheritdoc/>
        public async Task<ApplicationUser?> FindByEmailAsync(string email) =>
            await _userManager.FindByEmailAsync(email);

        /// <inheritdoc/>
        public async Task<IList<string>> GetUserRolesAsync(ApplicationUser user) =>
            await _userManager.GetRolesAsync(user);

        /// <inheritdoc/>
        public async Task<IdentityResult> AssignRoleToUserAsync(ApplicationUser user, string role) =>
            await _userManager.AddToRoleAsync(user, role);

        /// <inheritdoc/>
        public async Task<ApplicationUser?> GetByIdAsync(string id) =>
            await _userManager.FindByIdAsync(id); 
        
        /// <inheritdoc/>
        public async Task<bool> UpdateAsync(ApplicationUser user) =>
            (await _userManager.UpdateAsync(user)).Succeeded;
    }
}