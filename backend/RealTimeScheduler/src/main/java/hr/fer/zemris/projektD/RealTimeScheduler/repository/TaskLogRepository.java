package hr.fer.zemris.projektD.RealTimeScheduler.repository;

import hr.fer.zemris.projektD.RealTimeScheduler.model.TaskLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskLogRepository extends MongoRepository<TaskLog, String> {
}

