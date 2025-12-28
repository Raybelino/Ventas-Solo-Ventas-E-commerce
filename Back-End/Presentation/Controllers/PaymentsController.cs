/// <summary>
/// Controlador para gestionar los pagos utilizando Stripe.
/// </summary>

using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using Back_End.Application.DTO;

namespace Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        public PaymentsController()
        {
            StripeConfiguration.ApiKey = "sk_test_51RiREnCja6HHO2yIq7bymp5VghosL457UqfdlPr1LOlujge6Q07VCxaScLVs05QQSk9U6CowTiY3w56PyYDBjvbL00dB0SCYfY"; // ✅ Sustituye esto por tu clave secreta real
        }

        /// <summary>
        /// Crea una sesión de pago en Stripe.
        /// </summary>
        /// <param name="items">
        /// Lista de objetos <see cref="CheckoutItemDto"/> que representan los artículos a comprar.
        /// </param>
        /// <returns>
        /// Un objeto que contiene el ID de la sesión de pago si la creación es exitosa;
        /// </returns>

        [HttpPost("create-checkout-session")]
        public IActionResult CreateCheckoutSession([FromBody] List<CheckoutItemDto> items)
        {
            try
            {
                // Mapear los artículos a los formatos que Stripe espera
                var lineItems = items.Select(item => new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "usd",
                        UnitAmount = (long)(item.Price * 100),
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = item.ProductName
                        }
                    },
                    Quantity = item.Quantity
                }).ToList();

                // Crear la sesión de pago
                var options = new SessionCreateOptions
                {
                    PaymentMethodTypes = new List<string> { "card" },
                    LineItems = lineItems,
                    Mode = "payment",
                    SuccessUrl = "http://localhost:5173/payment-success",
                    CancelUrl = "http://localhost:5173/cart"
                };

                // Crear la sesión usando el servicio de Stripe
                var service = new SessionService();
                var session = service.Create(options);

                return Ok(new { sessionId = session.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }
    }
}