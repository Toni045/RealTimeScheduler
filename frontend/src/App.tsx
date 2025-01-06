import React from 'react';
import UserList from './components/UserList';
import TaskList from './components/TaskList';
import TaskLogList from './components/TaskLogList';

const App: React.FC = () => {
  return (
      <div>
        <h1>Real-Time Scheduler</h1>
        <UserList />
        <TaskList />
        <TaskLogList />
      </div>
  );
};

export default App;
