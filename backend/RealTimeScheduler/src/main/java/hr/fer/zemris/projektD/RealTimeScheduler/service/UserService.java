package hr.fer.zemris.projektD.RealTimeScheduler.service;

import hr.fer.zemris.projektD.RealTimeScheduler.dto.UserDTO;
import hr.fer.zemris.projektD.RealTimeScheduler.exception.UserNotFoundException;
import hr.fer.zemris.projektD.RealTimeScheduler.mapper.UserMapper;
import hr.fer.zemris.projektD.RealTimeScheduler.model.User;
import hr.fer.zemris.projektD.RealTimeScheduler.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id)); // Replace with custom exception
        return userMapper.toDTO(user);
    }

    public UserDTO createUser(UserDTO userDTO) {
        User user = userMapper.toEntity(userDTO);
        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }

    public UserDTO updateUser(String id, UserDTO userDTO) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id)); // Replace with custom exception
        userMapper.updateEntity(userDTO, existingUser);
        User updatedUser = userRepository.save(existingUser);
        return userMapper.toDTO(updatedUser);
    }

    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id); // Replace with custom exception
        }
        userRepository.deleteById(id);
    }
}
