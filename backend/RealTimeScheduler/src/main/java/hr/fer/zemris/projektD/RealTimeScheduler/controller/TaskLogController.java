package hr.fer.zemris.projektD.RealTimeScheduler.controller;

import hr.fer.zemris.projektD.RealTimeScheduler.model.TaskLog;
import hr.fer.zemris.projektD.RealTimeScheduler.service.TaskLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/task-logs")
public class TaskLogController {

    @Autowired
    private TaskLogService taskLogService;

    @GetMapping
    public List<TaskLog> getAllTaskLogs() {
        return taskLogService.getAllTaskLogs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskLog> getTaskLogById(@PathVariable String id) {
        return taskLogService.getTaskLogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TaskLog createTaskLog(@RequestBody TaskLog taskLog) {
        return taskLogService.createTaskLog(taskLog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskLog> updateTaskLog(@PathVariable String id, @RequestBody TaskLog taskLog) {
        return ResponseEntity.ok(taskLogService.updateTaskLog(id, taskLog));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskLog(@PathVariable String id) {
        taskLogService.deleteTaskLog(id);
        return ResponseEntity.noContent().build();
    }
}

