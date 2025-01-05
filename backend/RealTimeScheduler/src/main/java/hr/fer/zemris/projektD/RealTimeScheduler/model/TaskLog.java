package hr.fer.zemris.projektD.RealTimeScheduler.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "task_logs")
public class TaskLog {

    @Id
    private String id;
    private String taskId; // Refers to Task entity
    private LocalDateTime executionTime;
    private String result; // e.g., "SUCCESS", "ERROR"
    private String details; // Error message or success details

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public LocalDateTime getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(LocalDateTime executionTime) {
        this.executionTime = executionTime;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}

