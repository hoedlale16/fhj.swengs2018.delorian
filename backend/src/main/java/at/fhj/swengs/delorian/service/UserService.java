package at.fhj.swengs.delorian.service;

import at.fhj.swengs.delorian.model.User;
import at.fhj.swengs.delorian.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service()
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByUserName(String username) {
        return userRepository.findById(username);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User save(User entity) {
        return userRepository.save(entity);
    }

    public void delete(String username) {
        userRepository.deleteById(username);
    }

    public Set<User> getUsersByName(Set<String> dtos) {
        Set<User> entities = new HashSet<>();
        if (dtos != null) {
            dtos.forEach((dto) -> entities.add(userRepository.findById(dto).get()));
        }
        return entities;
    }

}
