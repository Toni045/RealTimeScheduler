import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    TextField,
    Button,
    Stack,
    Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import api from '../api/api';

interface Task {
    id: string;
    description: string;
    scheduledTime: string;
    status: string;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Task>({
        id: '',
        description: '',
        scheduledTime: '',
        status: 'PENDING',
    });

    const fetchTasks = async () => {
        try {
            const response = await api.get<Task[]>('/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const createTask = async () => {
        try {
            await api.post('/tasks', newTask);
            fetchTasks();
            setNewTask({ id: '', description: '', scheduledTime: '', status: 'PENDING' });
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Task List
            </Typography>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <List>
                    {tasks.map((task) => (
                        <ListItem
                            key={task.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <ListItemText
                                primary={task.description}
                                secondary={`Status: ${task.status} | Scheduled Time: ${task.scheduledTime}`}
                            />
                            <IconButton color="error" onClick={() => deleteTask(task.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Typography variant="h6" gutterBottom>
                Create Task
            </Typography>
            <Stack spacing={2} sx={{ mb: 2 }}>
                <TextField
                    label="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Scheduled Time"
                    type="datetime-local"
                    value={newTask.scheduledTime}
                    onChange={(e) => setNewTask({ ...newTask, scheduledTime: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
            </Stack>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={createTask}
            >
                Add Task
            </Button>
        </Box>
    );
};

export default TaskList;
