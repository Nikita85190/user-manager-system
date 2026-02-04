import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  People as PeopleIcon, 
  Logout as LogoutIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';
import { authApi } from '../api/authApi';
import { getCurrentUser } from '../auth/authHelper';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = async () => {
    await authApi.logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <AdminIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel - User Management
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Welcome, <strong>{currentUser?.username}</strong> (Admin)
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f5f5f5', py: 3 }}>
        <Outlet />
      </Box>

      <Box 
        component="footer" 
        sx={{ 
          py: 2, 
          px: 2, 
          mt: 'auto',
          backgroundColor: '#1976d2',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="body2">
          © 2026 User Management System | Admin Access
        </Typography>
      </Box>
    </Box>
  );
};
