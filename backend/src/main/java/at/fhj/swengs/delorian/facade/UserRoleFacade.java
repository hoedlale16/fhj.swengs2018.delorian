package at.fhj.swengs.delorian.facade;

import at.fhj.swengs.delorian.dto.UserRoleDTO;
import at.fhj.swengs.delorian.model.Role;
import at.fhj.swengs.delorian.service.UserRoleService;
import at.fhj.swengs.delorian.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service()
@Transactional
public class UserRoleFacade {
    @Autowired
    private UserRoleService userRoleService;

    @Autowired
    private UserService userService;

    private void mapDtoToEntity(UserRoleDTO dto, Role entity) {
        entity.setRoleName(dto.getRoleName());
        entity.setDescription(dto.getDescription());
        entity.setAssignedUsers(userService.getUsersByName(dto.getAssignedUsers()));
    }

    private void mapEntityToDto(Role entity, UserRoleDTO dto) {
        dto.setRoleName(entity.getRoleName());
        dto.setDescription(entity.getDescription());
        dto.setAssignedUsers(entity.getAssignedUsers().stream().map(u -> u.getUserName()).collect(Collectors.toSet()));
    }

    public Optional<UserRoleDTO> update(String usernameId, UserRoleDTO dto) {
        Optional<Role> entity = userRoleService.findByRoleName(usernameId);
        if(entity.isPresent()) {
            mapDtoToEntity(dto, entity.get());
            mapEntityToDto(userRoleService.save(entity.get()), dto);
            return Optional.of(dto);
        }
        return Optional.empty();
    }

    public UserRoleDTO create(UserRoleDTO dto) {
        Role entity = new Role();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(userRoleService.save(entity), dto);
        return dto;
    }

    public void delete(String username) {
        userRoleService.delete(username);
    }

    public Optional<UserRoleDTO> getByUsername(String username) {
        Optional<Role> entity = userRoleService.findByRoleName(username);
        if(entity.isPresent()) {
            UserRoleDTO dto = new UserRoleDTO();
            mapEntityToDto(entity.get(), dto);
            return Optional.of(dto);
        }
        return Optional.empty();
    }

    public List<UserRoleDTO> getAllRoles() {
        List<UserRoleDTO> roles = new ArrayList<>();

        userRoleService.getRoles().forEach(entity -> {
            UserRoleDTO dto = new UserRoleDTO();
            mapEntityToDto(entity,dto);
            roles.add(dto);
        });

        return roles;
    }


}
