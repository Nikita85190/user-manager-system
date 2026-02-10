import { useEffect, useState } from 'react';
import { getProducts } from '../api/productsApi';
import { ProductDTO } from '../models/types';
import './HomePage.css';

export const HomePage = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="home-page">
      <div className="products-grid">
        {products.map((product) => (
          <a
            key={product.id}
            className="product-photo"
            data-id={product.id}
            data-name={product.name}
            data-price={product.price}
            tabIndex={0}
          >
            <img
              fetchpriority="low"
              width="170"
              height="226"
              className="product-photo-img"
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
            />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price.toFixed(2)} PLN</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
