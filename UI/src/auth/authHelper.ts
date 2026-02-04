import { jwtDecode } from 'jwt-decode';
import { getAccessToken } from './tokenStorage';
import { UserRole } from '../models/types';

interface JwtPayload {
  sub: string;
  unique_name: string;
  role: string;
  exp: number;
  [key: string]: any;
}

export const getCurrentUser = (): { id: number; username: string; role: UserRole } | null => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    console.log('Decoded JWT:', decoded); // Debug log
    
    // Role может быть в разных форматах
    const roleValue = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    console.log('Role value:', roleValue); // Debug log
    
    const isAdminRole = roleValue === 'Admin' || roleValue === 'admin' || roleValue === '1' || roleValue === 1;
    
    return {
      id: parseInt(decoded.sub),
      username: decoded.unique_name,
      role: isAdminRole ? UserRole.Admin : UserRole.Client
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (error) {
    return false;
  }
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  console.log('Current user:', user); // Debug log
  return user?.role === UserRole.Admin;
};

export const isClient = (): boolean => {
  const user = getCurrentUser();
  return user?.role === UserRole.Client;
};
