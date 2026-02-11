using API.DTOs;
using API.Models;
using API.Repositories;

namespace API.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ProductDTO>> GetAllProductsAsync(CancellationToken cancellationToken = default)
        {
            var products = await _repository.GetAllAsync(cancellationToken);
            return products.Select(p => new ProductDTO
            {
                Id = p.Id,
                Name = p.Name,
                ImageUrl = p.ImageUrl,
                Price = p.Price,
                Description = p.Description
            });
        }

        public async Task<ProductDTO?> GetProductByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var product = await _repository.GetByIdAsync(id, cancellationToken);
            if (product == null)
                return null;

            return new ProductDTO
            {
                Id = product.Id,
                Name = product.Name,
                ImageUrl = product.ImageUrl,
                Price = product.Price,
                Description = product.Description
            };
        }

        public async Task<ProductDTO> CreateProductAsync(CreateProductRequest request, CancellationToken cancellationToken = default)
        {
            var product = new Product
            {
                Name = request.Name,
                ImageUrl = request.ImageUrl,
                Price = request.Price,
                Description = request.Description
            };

            var created = await _repository.AddAsync(product, cancellationToken);

            return new ProductDTO
            {
                Id = created.Id,
                Name = created.Name,
                ImageUrl = created.ImageUrl,
                Price = created.Price,
                Description = created.Description
            };
        }

        public async Task<ProductDTO?> UpdateProductAsync(int id, UpdateProductRequest request, CancellationToken cancellationToken = default)
        {
            var product = await _repository.GetByIdAsync(id, cancellationToken);
            if (product == null)
                return null;

            product.Name = request.Name;
            product.ImageUrl = request.ImageUrl;
            product.Price = request.Price;
            product.Description = request.Description;

            var updated = await _repository.UpdateAsync(product, cancellationToken);

            return new ProductDTO
            {
                Id = updated.Id,
                Name = updated.Name,
                ImageUrl = updated.ImageUrl,
                Price = updated.Price,
                Description = updated.Description
            };
        }

        public async Task<bool> DeleteProductAsync(int id, CancellationToken cancellationToken = default)
        {
            return await _repository.DeleteAsync(id, cancellationToken);
        }
    }
}