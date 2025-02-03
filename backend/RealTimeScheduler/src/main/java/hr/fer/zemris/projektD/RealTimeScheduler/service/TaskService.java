package hr.fer.zemris.projektD.RealTimeScheduler.service;

import hr.fer.zemris.projektD.RealTimeScheduler.dto.TaskDTO;
import hr.fer.zemris.projektD.RealTimeScheduler.exception.TaskNotFoundException;
import hr.fer.zemris.projektD.RealTimeScheduler.mapper.TaskMapper;
import hr.fer.zemris.projektD.RealTimeScheduler.model.Task;
import hr.fer.zemris.projektD.RealTimeScheduler.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final EmailService emailService;

    @Autowired
    public TaskService(TaskRepository taskRepository, TaskMapper taskMapper, EmailService emailService) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
        this.emailService = emailService;
    }

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(taskMapper::toDTO)
                .collect(Collectors.toList());
    }

    public TaskDTO getTaskById(String id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id)); // Replace with custom exception
        return taskMapper.toDTO(task);
    }

    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = taskMapper.toEntity(taskDTO);
        Task savedTask = taskRepository.save(task);

        // Send email after task creation
        String customerEmail = "t.serezlija@gmail.com";  // Replace with real email
        emailService.sendTaskCreationEmail(customerEmail, savedTask.getDescription());

        return taskMapper.toDTO(savedTask);
    }

    public TaskDTO updateTask(String id, TaskDTO taskDTO) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id)); // Replace with custom exception
        taskMapper.updateEntity(taskDTO, existingTask);
        Task updatedTask = taskRepository.save(existingTask);
        return taskMapper.toDTO(updatedTask);
    }

    public void deleteTask(String id) {
        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException(id); // Replace with custom exception
        }
        taskRepository.deleteById(id);
    }
}
