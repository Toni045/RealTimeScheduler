package hr.fer.zemris.projektD.RealTimeScheduler.exception;

public class UserNotFoundException extends ResourceNotFoundException {
    public UserNotFoundException(String id) {
        super("User with ID " + id + " was not found.");
    }
}
