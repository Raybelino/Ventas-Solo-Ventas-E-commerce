/// <summary>
/// Controlador para gestionar los productos.
/// </summary>

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Back_End.Application.Services.Interfaces;
using Back_End.Domain.Entities;

namespace Back_End.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;
        public ProductsController(IProductService service)
        {
            _service = service;
        }

        /// <summary>
        /// Obtiene todos los productos.
        /// </summary>
        /// <returns>
        /// Una lista de todos los productos en el sistema.
        /// </returns>

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _service.GetAllAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Obtiene un producto por su ID.
        /// </summary>
        /// <param name="id">
        /// Parametro de tipo entero que representa el identificador único del producto a obtener.
        /// </param>
        /// <returns>
        /// El producto correspondiente al ID proporcionado, o un estado NotFound si no existe.
        /// </returns>

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var product = await _service.GetByIdAsync(id);
                return product == null ? NotFound() : Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Crea un nuevo producto.
        /// </summary>
        /// <param name="product">
        /// El producto a crear.
        /// </param>
        /// <returns>
        /// El producto creado con su ID asignado y un estado Created.
        /// </returns>

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(Product product)
        {
            try
            {
                var created = await _service.CreateAsync(product);
                return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Actualiza un producto existente.
        /// </summary>
        /// <param name="id">
        /// El ID del producto a actualizar.
        /// </param>
        /// <param name="product">
        /// El producto con los datos actualizados.
        /// </param>
        /// <returns>
        /// Un estado NoContent si la actualización es exitosa, o BadRequest si el ID no coincide.
        /// </returns>

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Product product)
        {
            try
            {
                if (id != product.Id) return BadRequest();
                await _service.UpdateAsync(product);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Elimina un producto por su ID.
        /// </summary>
        /// <param name="id">
        /// El ID del producto a eliminar.
        /// </param>
        /// <returns>\
        /// Un estado NoContent si la eliminación es exitosa.
        /// </returns>

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _service.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Sube una imagen para un producto.
        /// </summary>
        /// <param name="file">
        /// El archivo de imagen a subir.
        /// </param>
        /// <returns>
        /// La ruta de la imagen subida si la operación es exitosa; de lo contrario, un mensaje de error con detalles.
        /// </returns>

        [Authorize(Roles = "Admin")]
        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "Archivo no válido" });

            try
            {
                // Asegurarse de que la carpeta de destino exista
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // Generar un nombre único para el archivo
                var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                // Guardar el archivo en el servidor
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                // Devolver la ruta de la imagen subida
                var imagePath = $"/images/{uniqueFileName}";
                return Ok(new { imagePath });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al subir la imagen", details = ex.Message });
            }
        }
    }
}