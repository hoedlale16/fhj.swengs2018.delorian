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
        return userRepository.findByUserNameAndActiveTrue(username);
    }

    public List<User> getUsers() {
        return userRepository.findAllByActiveTrue();
    }

    public User save(User entity) {
        return userRepository.save(entity);
    }

    // No deletion of user if there there project time or not entries as managesProjects.
    // In this case just deactivate user
    public void delete(String username) {
        Optional<User> optEntity  = findByUserName(username);
        if(optEntity.isPresent()) {
            User entity = optEntity.get();
            if(entity.getProjectTimes().isEmpty() && entity.getManagedProjects().isEmpty()) {
                userRepository.deleteById(username);
            } else {
                entity.setActive(false);
                save(entity);
            }
        }
    }

    public Set<User> getUsersByName(Set<String> dtos) {
        Set<User> entities = new HashSet<>();
        if (dtos != null) {
            dtos.forEach((dto) -> entities.add(userRepository.findByUserNameAndActiveTrue(dto).get()));
        }
        return entities;
    }

}
