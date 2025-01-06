import React, { useEffect, useState } from 'react';
import api from '../api/api';

interface Task {
    id: string;
    userId: string;
    description: string;
    scheduledTime: string;
    status: string;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Task>({
        id: '',
        userId: '',
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
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.description} - {task.status}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Create Task</h2>
            <input
                placeholder="User ID"
                value={newTask.userId}
                onChange={(e) => setNewTask({ ...newTask, userId: e.target.value })}
            />
            <input
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <input
                placeholder="Scheduled Time"
                value={newTask.scheduledTime}
                onChange={(e) => setNewTask({ ...newTask, scheduledTime: e.target.value })}
            />
            <button onClick={createTask}>Add Task</button>
        </div>
    );
};

export default TaskList;
