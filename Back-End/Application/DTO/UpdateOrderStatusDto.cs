/// <summary>
/// El DTO para actualizar el estado de una orden.
/// </summary>

namespace Back_End.Application.DTO
{
    public class UpdateOrderStatusDto
    {
        /// <summary>
        /// El nuevo estado de la orden. Por defecto es "Pendiente".
        /// </summary>
        public string Status { get; set; } = "Pendiente";
    }
}