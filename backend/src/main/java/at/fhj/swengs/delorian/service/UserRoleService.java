package at.fhj.swengs.delorian.service;

import at.fhj.swengs.delorian.model.Role;
import at.fhj.swengs.delorian.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service()
public class UserRoleService {

    @Autowired
    private UserRoleRepository userRoleRepository;

    public Set<Role> getRolesByNames(Set<String> dtos) {
        Set<Role> entities = new HashSet<>();
        if (dtos != null) {
            dtos.forEach((dto) -> entities.add(userRoleRepository.findById(dto).get()));
        }
        return entities;
    }

    public List<Role> getRoles() {
        return userRoleRepository.findAll();
    }

    public Optional<Role> findByRoleName(String rolename) {
        return userRoleRepository.findById(rolename);
    }

    public Role save(Role entity) {
        return userRoleRepository.save(entity);
    }

    public void delete(String rolename) {
        // UserRoles hard coded used in SecurityConfig for JWT - never delete them!
        // Think twice to delete userRoles and use this feature whisely!
        List<String> protectedRoles = new ArrayList<String>() {{
            add("ROLE_ADMIN");
            add("ROLE_PRJMGR");
            add("ROLE_USER");
        }};
        if(protectedRoles.contains(rolename)) {
            // Do not delete userRoles which are used hard coded for backend Security!
        } else {
            Optional<Role> optEntity = findByRoleName(rolename);
            if (optEntity.isPresent()) {
                Role entity = optEntity.get();
                if (entity.getAssignedUsers().isEmpty()) {
                    userRoleRepository.deleteById(rolename);
                } else {

                }
            }
        }
    }
}
