package hr.fer.zemris.projektD.RealTimeScheduler.repository;

import hr.fer.zemris.projektD.RealTimeScheduler.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
}
