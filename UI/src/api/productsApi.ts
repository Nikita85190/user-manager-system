import apiClient from './apiClient';
import { ProductDTO, CreateProductRequest, UpdateProductRequest } from '../models/types';

export const productsApi = {
  getAll: async (): Promise<ProductDTO[]> => {
    const response = await apiClient.get('/products');
    return response.data;
  },

  getById: async (id: number): Promise<ProductDTO> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  create: async (request: CreateProductRequest): Promise<ProductDTO> => {
    const response = await apiClient.post('/products', request);
    return response.data;
  },

  update: async (id: number, request: UpdateProductRequest): Promise<ProductDTO> => {
    const response = await apiClient.put(`/products/${id}`, request);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  }
};

// Backward compatibility
export const getProducts = productsApi.getAll;
