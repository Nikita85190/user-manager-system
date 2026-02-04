import { Box, AppBar, Toolbar, Typography, Button, Chip } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  People as PeopleIcon, 
  Logout as LogoutIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { authApi } from '../api/authApi';
import { getCurrentUser } from '../auth/authHelper';

export const ClientLayout = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = async () => {
    await authApi.logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={2} color="secondary">
        <Toolbar>
          <PersonIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Management - View Only
          </Typography>
          <Chip 
            icon={<PersonIcon />}
            label={currentUser?.username}
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white', mr: 2 }}
          />
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#fafafa', py: 3 }}>
        <Outlet />
      </Box>

      <Box 
        component="footer" 
        sx={{ 
          py: 2, 
          px: 2, 
          mt: 'auto',
          backgroundColor: '#9c27b0',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="body2">
          © 2026 User Management System | Client Access (Read Only)
        </Typography>
      </Box>
    </Box>
  );
};
