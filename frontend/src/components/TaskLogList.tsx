import React, { useEffect, useState } from 'react';
import api from '../api/api';

interface TaskLog {
    id: string;
    taskId: string;
    executionTime: string;
    result: string;
    details: string;
}

const TaskLogList: React.FC = () => {
    const [taskLogs, setTaskLogs] = useState<TaskLog[]>([]);

    const fetchTaskLogs = async () => {
        try {
            const response = await api.get<TaskLog[]>('/task-logs');
            setTaskLogs(response.data);
        } catch (error) {
            console.error('Error fetching task logs:', error);
        }
    };

    useEffect(() => {
        fetchTaskLogs();
    }, []);

    return (
        <div>
            <h1>Task Logs</h1>
            <ul>
                {taskLogs.map((log) => (
                    <li key={log.id}>
                        Task ID: {log.taskId}, Result: {log.result}, Execution Time: {log.executionTime}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskLogList;
