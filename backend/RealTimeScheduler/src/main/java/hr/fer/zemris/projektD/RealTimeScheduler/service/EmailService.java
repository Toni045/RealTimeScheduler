package hr.fer.zemris.projektD.RealTimeScheduler.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendTaskCreationEmail(String to, String taskTitle) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("New Task Created");
        message.setText("A new task has been created: " + taskTitle);

        mailSender.send(message);
    }
}

