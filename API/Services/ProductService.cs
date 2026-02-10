using System.Collections.Generic;
using System.Linq;
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

        public IEnumerable<ProductDTO> GetAllProducts()
        {
            var products = _repository.GetAll();
            return products.Select(p => new ProductDTO
            {
                Id = p.Id,
                Name = p.Name,
                ImageUrl = p.ImageUrl,
                Price = p.Price,
                Description = p.Description
            });
        }

        public ProductDTO GetProductById(int id)
        {
            var product = _repository.GetById(id);
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

        public ProductDTO CreateProduct(CreateProductRequest request)
        {
            var product = new Product
            {
                Name = request.Name,
                ImageUrl = request.ImageUrl,
                Price = request.Price,
                Description = request.Description
            };

            var created = _repository.Add(product);

            return new ProductDTO
            {
                Id = created.Id,
                Name = created.Name,
                ImageUrl = created.ImageUrl,
                Price = created.Price,
                Description = created.Description
            };
        }

        public ProductDTO UpdateProduct(int id, UpdateProductRequest request)
        {
            var product = _repository.GetById(id);
            if (product == null)
                return null;

            product.Name = request.Name;
            product.ImageUrl = request.ImageUrl;
            product.Price = request.Price;
            product.Description = request.Description;

            var updated = _repository.Update(product);

            return new ProductDTO
            {
                Id = updated.Id,
                Name = updated.Name,
                ImageUrl = updated.ImageUrl,
                Price = updated.Price,
                Description = updated.Description
            };
        }

        public bool DeleteProduct(int id)
        {
            return _repository.Delete(id);
        }
    }
}