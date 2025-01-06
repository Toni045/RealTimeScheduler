import React, { useEffect, useState } from 'react';
import api from '../api/api';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState<User>({ id: '', name: '', email: '', role: '' });

    // Fetch users
    const fetchUsers = async () => {
        try {
            const response = await api.get<User[]>('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Create user
    const createUser = async () => {
        try {
            await api.post('/users', newUser);
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    // Delete user
    const deleteUser = async (id: string) => {
        try {
            await api.delete(`/users/${id}`);
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email} ({user.role})
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Create User</h2>
            <input
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
                placeholder="Role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />
            <button onClick={createUser}>Add User</button>
        </div>
    );
};

export default UserList;
