package hr.fer.zemris.projektD.RealTimeScheduler.service;

import hr.fer.zemris.projektD.RealTimeScheduler.model.TaskLog;
import hr.fer.zemris.projektD.RealTimeScheduler.repository.TaskLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TaskLogService {

    @Autowired
    private TaskLogRepository taskLogRepository;

    public List<TaskLog> getAllTaskLogs() {
        return taskLogRepository.findAll();
    }

    public Optional<TaskLog> getTaskLogById(String id) {
        return taskLogRepository.findById(id);
    }

    public TaskLog createTaskLog(TaskLog taskLog) {
        return taskLogRepository.save(taskLog);
    }

    public TaskLog updateTaskLog(String id, TaskLog taskLogDetails) {
        return taskLogRepository.findById(id).map(taskLog -> {
            taskLog.setTaskId(taskLogDetails.getTaskId());
            taskLog.setExecutionTime(taskLogDetails.getExecutionTime());
            taskLog.setResult(taskLogDetails.getResult());
            taskLog.setDetails(taskLogDetails.getDetails());
            return taskLogRepository.save(taskLog);
        }).orElseThrow(() -> new RuntimeException("TaskLog not found"));
    }

    public void deleteTaskLog(String id) {
        taskLogRepository.deleteById(id);
    }
}

