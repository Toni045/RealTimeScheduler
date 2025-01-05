package hr.fer.zemris.projektD.RealTimeScheduler.repository;

import hr.fer.zemris.projektD.RealTimeScheduler.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
}

