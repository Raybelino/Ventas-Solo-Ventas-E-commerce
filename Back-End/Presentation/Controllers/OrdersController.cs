/// <summary>
/// Controlador para gestionar las órdenes.
/// </summary>

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Back_End.Application.DTO;
using Back_End.Application.Services.Interfaces;

namespace Back_End.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        /// <summary>
        /// Crea una nueva orden.
        /// </summary>
        /// <param name="dto">
        /// El DTO que contiene la información de la orden a crear.
        /// </param>
        /// <returns>
        /// Una tarea que representa la operación asincrónica.
        /// </returns>

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OrderDto dto)
        {
            try
            {
                await _orderService.CreateOrderAsync(dto);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Obtiene todas las órdenes.
        /// </summary>
        /// <returns>
        /// Una lista de todas las órdenes en el sistema.
        /// </returns>

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var orders = await _orderService.GetAllOrdersAsync();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Actualiza el estado de una orden.
        /// </summary>
        /// <param name="orderId">
        /// El ID de la orden a actualizar.
        /// </param>
        /// <param name="dto">
        /// El DTO que contiene el nuevo estado de la orden.
        /// </param>
        /// <returns>
        /// true si la actualización fue exitosa; de lo contrario, false.
        /// </returns>

        [Authorize]
        [HttpPut("{orderId}/status")]
        public async Task<IActionResult> UpdateStatus(int orderId, [FromBody] UpdateOrderStatusDto dto)
        {
            try
            {
                var success = await _orderService.UpdateOrderStatusAsync(orderId, dto.Status);

                // Si la orden no existe, devolver un 404
                if (!success)
                    return NotFound(new { message = "Orden no encontrada" });

                return Ok(new { message = $"Estado actualizado a {dto.Status}" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }
    }
}