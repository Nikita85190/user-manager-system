import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { UsersListPage } from './pages/UsersListPage';
import { CreateUserPage } from './pages/CreateUserPage';
import { EditUserPage } from './pages/EditUserPage';
import { ProductsManagementPage } from './pages/ProductsManagementPage';
import { CreateProductPage } from './pages/CreateProductPage';
import { EditProductPage } from './pages/EditProductPage';
import { PublicLayout } from './layouts/PublicLayout';
import { RoleBasedLayout } from './routes/RoleBasedLayout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
