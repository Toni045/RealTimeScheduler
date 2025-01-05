package hr.fer.zemris.projektD.RealTimeScheduler.service;

import hr.fer.zemris.projektD.RealTimeScheduler.model.Task;
import hr.fer.zemris.projektD.RealTimeScheduler.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(String id, Task taskDetails) {
        return taskRepository.findById(id).map(task -> {
            task.setUserId(taskDetails.getUserId());
            task.setDescription(taskDetails.getDescription());
            task.setScheduledTime(taskDetails.getScheduledTime());
            task.setStatus(taskDetails.getStatus());
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }
}

