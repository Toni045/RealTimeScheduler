package hr.fer.zemris.projektD.RealTimeScheduler.exception;

public class TaskNotFoundException extends ResourceNotFoundException {
    public TaskNotFoundException(String id) {
        super("Task with ID " + id + " was not found.");
    }
}
