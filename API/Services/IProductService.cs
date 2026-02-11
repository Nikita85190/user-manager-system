using API.DTOs;

namespace API.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDTO>> GetAllProductsAsync(CancellationToken cancellationToken = default);
        Task<ProductDTO?> GetProductByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<ProductDTO> CreateProductAsync(CreateProductRequest request, CancellationToken cancellationToken = default);
        Task<ProductDTO?> UpdateProductAsync(int id, UpdateProductRequest request, CancellationToken cancellationToken = default);
        Task<bool> DeleteProductAsync(int id, CancellationToken cancellationToken = default);
    }
}