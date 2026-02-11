import { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, CircularProgress } from '@mui/material';
import { PublicLayout } from './layouts/PublicLayout';
import { RoleBasedLayout } from './routes/RoleBasedLayout';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load pages
const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const UsersListPage = lazy(() => import('./pages/UsersListPage').then(module => ({ default: module.UsersListPage })));
const CreateUserPage = lazy(() => import('./pages/CreateUserPage').then(module => ({ default: module.CreateUserPage })));
const EditUserPage = lazy(() => import('./pages/EditUserPage').then(module => ({ default: module.EditUserPage })));
const ProductsManagementPage = lazy(() => import('./pages/ProductsManagementPage').then(module => ({ default: module.ProductsManagementPage })));
const CreateProductPage = lazy(() => import('./pages/CreateProductPage').then(module => ({ default: module.CreateProductPage })));
const EditProductPage = lazy(() => import('./pages/EditProductPage').then(module => ({ default: module.EditProductPage })));

// Loading fallback component
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}
  >
    <CircularProgress size={60} />
  </Box>
);

function App() {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#667eea',
          },
          secondary: {
            main: '#764ba2',
          },
        },
      }),
    []
  );

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Routes with PublicLayout */}
              <Route element={<PublicLayout />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>

              {/* Protected Routes with Role-Based Layout (Admin or Client) */}
              <Route element={<RoleBasedLayout><div /></RoleBasedLayout>}>
                <Route path="/" element={<HomePage />} />
                <Route path="/users" element={<UsersListPage />} />
                <Route path="/users/create" element={<CreateUserPage />} />
                <Route path="/users/edit/:id" element={<EditUserPage />} />
                <Route path="/products" element={<ProductsManagementPage />} />
                <Route path="/products/create" element={<CreateProductPage />} />
                <Route path="/products/edit/:id" element={<EditProductPage />} />
              </Route>
              
              {/* Default Routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
