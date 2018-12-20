package at.fhj.swengs.delorian.facade;

import at.fhj.swengs.delorian.dto.UserDTO;
import at.fhj.swengs.delorian.model.User;
import at.fhj.swengs.delorian.service.ProjectService;
import at.fhj.swengs.delorian.service.ProjectTimeService;
import at.fhj.swengs.delorian.service.UserRoleService;
import at.fhj.swengs.delorian.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service()
@Transactional
public class UserFacade {

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRoleService userRoleService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ProjectTimeService projectTimeService;


    void mapDtoToEntity(UserDTO dto, User entity) {
        entity.setUserName(dto.getUsername());

        if(dto.getPassword() != null ) {
            String encodedPW = encoder.encode(dto.getPassword());
            entity.setPassword(encodedPW);
        }

        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.seteMail(dto.geteMail());

        entity.setUserRoles(userRoleService.getRolesByNames(dto.getUserRoles()));
        entity.setManagedProjects(projectService.getProjectsByID(dto.getManagedProjects()));
        entity.setProjectTimes(projectTimeService.getProjectTimes(dto.getProjectTimes()));


    }

    private void mapEntityToDto(User entity, UserDTO dto) {

        dto.setUsername(entity.getUserName());
        //TO not set password to send to frontend!

        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.seteMail(entity.geteMail());

        dto.setUserRoles(entity.getUserRoles().stream().map(r -> r.getRoleName()).collect(Collectors.toSet()));
        dto.setManagedProjects(entity.getManagedProjects().stream().map(p -> p.getId()).collect(Collectors.toSet()));
        dto.setProjectTimes(entity.getProjectTimes().stream().map(t -> t.getId()).collect(Collectors.toList()));
    }

    public UserDTO update(String usernameId, UserDTO dto) {
        User entity = userService.findByUserName(usernameId).get();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(userService.save(entity), dto);
        return dto;
    }

    public UserDTO create(UserDTO dto) {
        User entity = new User();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(userService.save(entity), dto);
        return dto;
    }

    public UserDTO getByUsername(String username) {
        User entity = userService.findByUserName(username).get();
        UserDTO dto = new UserDTO();
        mapEntityToDto(entity, dto);
        return dto;
    }
}
