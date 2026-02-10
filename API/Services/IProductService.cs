using System.Collections.Generic;
using API.DTOs;

namespace API.Services
{
    public interface IProductService
    {
        IEnumerable<ProductDTO> GetAllProducts();
        ProductDTO GetProductById(int id);
        ProductDTO CreateProduct(CreateProductRequest request);
        ProductDTO UpdateProduct(int id, UpdateProductRequest request);
        bool DeleteProduct(int id);
    }
}