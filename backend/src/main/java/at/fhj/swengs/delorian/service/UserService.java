package at.fhj.swengs.delorian.service;

import at.fhj.swengs.delorian.model.User;
import at.fhj.swengs.delorian.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service()
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByUserName(String username) {
        return userRepository.findById(username);
    }

    public User save(User entity) {
        return userRepository.save(entity);
    }

}
