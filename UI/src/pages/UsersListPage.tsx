import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Button,
  Typography,
  Alert
} from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { usersApi } from '../api/usersApi';
import { User, UserRole } from '../models/types';
import { isAdmin } from '../auth/authHelper';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useConfirmDialog } from '../hooks/useConfirmDialog';

export const UsersListPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const navigate = useNavigate();
  const userIsAdmin = isAdmin();

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleCreate = useCallback(() => {
    navigate('/users/create');
  }, [navigate]);

  const handleEdit = useCallback((userId: number) => {
    navigate(`/users/edit/${userId}`);
  }, [navigate]);

  const handleDeleteClick = useCallback((userId: number) => {
    setUserToDelete(userId);
    openDialog();
  }, []);

  const performDelete = useCallback(async () => {
    if (userToDelete === null) return;
    
    try {
      await usersApi.delete(userToDelete);
      await loadUsers();
    } catch (err) {
      setError('Failed to delete user');
      console.error('Failed to delete user:', err);
    } finally {
      setUserToDelete(null);
    }
  }, [userToDelete, loadUsers]);

  const { isOpen, openDialog, closeDialog, handleConfirm } = useConfirmDialog(performDelete);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 80 },
      { field: 'username', headerName: 'Username', flex: 1, minWidth: 200 },
      {
        field: 'role',
        headerName: 'Role',
        flex: 1,
        minWidth: 150,
        renderCell: (params) => {
          const roleValue = params.row.role;
          return roleValue === UserRole.Admin || roleValue === 1 ? 'Admin' : 'Client';
        }
      },
      ...(userIsAdmin ? [{
        field: 'actions',
        type: 'actions' as const,
        headerName: 'Actions',
        width: 120,
        getActions: (params: { row: User }) => [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEdit(params.row.id)}
            showInMenu={false}
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params.row.id)}
            showInMenu={false}
          />,
        ],
      }] : [])
    ],
    [userIsAdmin, handleEdit, handleDeleteClick]
  );

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h2">
            {userIsAdmin ? 'Manage Users' : 'View Users'}
          </Typography>
          {userIsAdmin && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
            >
              Add User
            </Button>
          )}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            loading={loading}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>

      <ConfirmDialog
        open={isOpen}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleConfirm}
        onCancel={closeDialog}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </Container>
  );
};
