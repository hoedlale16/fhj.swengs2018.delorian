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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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


    private void mapDtoToEntity(UserDTO dto, User entity) {
        entity.setUserName(dto.getUsername());

        if(dto.getPassword() != null && ! dto.getPassword().isEmpty() ) {
            String encodedPW = encoder.encode(dto.getPassword());
            entity.setPassword(encodedPW);
        }

        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.seteMail(dto.geteMail());
        entity.setActive(true);

        entity.setUserRoles(userRoleService.getRolesByNames(dto.getUserRoles()));
        entity.setManagedProjects(projectService.getProjectsByID(dto.getManagedProjects()));
        entity.setProjectTimes(projectTimeService.getProjectTimes(dto.getProjectTimes()));
    }

    private void mapEntityToDto(User entity, UserDTO dto) {

        dto.setUsername(entity.getUserName());
        //Do NOT set password to send to frontend!
        //Do not set active flag - not required for frontend. handels just with active users

        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.seteMail(entity.geteMail());

        dto.setUserRoles(entity.getUserRoles().stream().map(r -> r.getRoleName()).collect(Collectors.toSet()));
        dto.setManagedProjects(entity.getManagedProjects().stream().map(p -> p.getId()).collect(Collectors.toSet()));

        //Do nOT set allready booked project times. not relevant in frontend!
        //dto.setProjectTimes(entity.getProjectTimes().stream().map(t -> t.getId()).collect(Collectors.toList()));
    }

    public UserDTO update(String usernameId, UserDTO dto) {

        Optional<User> entity = userService.findActiveUserByUsername(usernameId);
        if(entity.isPresent()) {
            mapDtoToEntity(dto, entity.get());
            mapEntityToDto(userService.save(entity.get()), dto);
            return dto;
        }
        return null;
    }

    public UserDTO create(UserDTO dto) {
        User entity = new User();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(userService.save(entity), dto);
        return dto;
    }

    public void delete(String username) {
        userService.delete(username);
    }

    public UserDTO getByUsername(String username) {
        Optional<User> entity = userService.findActiveUserByUsername(username);
        if(entity.isPresent()) {
            UserDTO dto = new UserDTO();
            mapEntityToDto(entity.get(), dto);
            return dto;
        }
        return null;
    }

    public List<UserDTO> getAllUsers() {
        List<UserDTO> users = new ArrayList<>();

        userService.getUsers().forEach(entity -> {
            UserDTO dto = new UserDTO();
            mapEntityToDto(entity,dto);
            users.add(dto);
        });

        return users;
    }

    public Optional<UserDTO> isUsernameTaken(String username) {
        Optional<User> entity = userService.findUserByUsername(username);
        if(entity.isPresent()) {
            UserDTO dto = new UserDTO();
            dto.setUsername(entity.get().getUserName());
            return Optional.of(dto);
        }

        return Optional.empty();
    }
}
