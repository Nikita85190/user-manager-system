import { useEffect, useState, useCallback } from 'react';
import { Box, CircularProgress, Typography, Container, Alert } from '@mui/material';
import { getProducts } from '../api/productsApi';
import { ProductDTO } from '../models/types';
import './HomePage.css';

export const HomePage = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, product: ProductDTO) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Handle product click/selection
      console.log('Product selected:', product);
    }
  }, []);

  if (loading) {
    return (
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            gap: 2,
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" color="text.secondary">
            Loading products...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <div className="home-page">
      <div className="products-grid" role="list" aria-label="Product list">
        {products.map((product) => (
          <a
            key={product.id}
            className="product-photo"
            data-id={product.id}
            data-name={product.name}
            data-price={product.price}
            tabIndex={0}
            role="listitem"
            aria-label={`${product.name}, ${product.price.toFixed(2)} PLN`}
            onKeyDown={(e) => handleKeyDown(e, product)}
          >
            <img
              width="170"
              height="226"
              className="product-photo-img"
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
            />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price" aria-label={`Price: ${product.price.toFixed(2)} PLN`}>
                {product.price.toFixed(2)} PLN
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
