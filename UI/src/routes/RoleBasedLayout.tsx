import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../auth/authHelper';
import { AdminLayout } from '../layouts/AdminLayout';
import { ClientLayout } from '../layouts/ClientLayout';

interface RoleBasedLayoutProps {
  children: JSX.Element;
}

export const RoleBasedLayout = ({ children }: RoleBasedLayoutProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const userIsAdmin = isAdmin();

  return userIsAdmin ? <AdminLayout /> : <ClientLayout />;
};
