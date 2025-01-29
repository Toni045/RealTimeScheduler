import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { List, ListItem, ListItemText, IconButton, Grid, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface User {
    id: string;
    name: string;
    email: string;
    roles: string[]; // Roles must always be an array
}

const mockRoles = ['User', 'Admin', 'Manager', 'Viewer']; // Mock roles for selection

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]); // List of users
    const [newUser, setNewUser] = useState<User>({ id: '', name: '', email: '', roles: [] });
    const [error, setError] = useState<string | null>(null); // Error message

    // Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await api.get<User[]>('/users');
            const usersWithRoles = response.data.map((user) => ({
                ...user,
                roles: user.roles || [], // Default roles to an empty array if undefined
            }));
            setUsers(usersWithRoles);
            setError(null); // Clear any previous error
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to fetch users. Please try again later.');
        }
    };

    // Create a new user
    const createUser = async () => {
        if (!newUser.name || !newUser.email || newUser.roles.length === 0) {
            setError('Please fill out all fields and add at least one role.');
            return;
        }
        try {
            await api.post('/users', newUser);
            fetchUsers(); // Refresh the user list
            setNewUser({ id: '', name: '', email: '', roles: [] }); // Reset the form
            setError(null); // Clear errors
        } catch (err) {
            console.error('Error creating user:', err);
            setError('Failed to create user. Please try again.');
        }
    };

    // Delete a user
    const deleteUser = async (id: string) => {
        try {
            await api.delete(`/users/${id}`);
            fetchUsers(); // Refresh the user list
            setError(null); // Clear any previous error
        } catch (err) {
            console.error('Error deleting user:', err);
            setError('Failed to delete user. Please try again.');
        }
    };

    // Handle role change in the select dropdown
    const handleRoleChange = (event: SelectChangeEvent<string[]>) => {
        const { value } = event.target;
        setNewUser({ ...newUser, roles: typeof value === 'string' ? value.split(',') : value });
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>User List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <List>
                {users.map((user) => (
                    <ListItem key={user.id}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={3}>
                                <ListItemText primary={user.name} secondary={user.email} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">Roles: {user.roles?.join(', ') || 'No roles assigned'}</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => deleteUser(user.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>

            <h2>Create User</h2>
            <TextField
                label="Name"
                fullWidth
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                margin="normal"
            />
            <TextField
                label="Email"
                fullWidth
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Roles</InputLabel>
                <Select
                    multiple
                    value={newUser.roles}
                    onChange={handleRoleChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {mockRoles.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={createUser}>
                Add User
            </Button>
        </div>
    );
};

export default UserList;
