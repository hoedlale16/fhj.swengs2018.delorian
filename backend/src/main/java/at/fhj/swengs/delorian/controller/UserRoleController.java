package at.fhj.swengs.delorian.controller;

import at.fhj.swengs.delorian.dto.UserRoleDTO;
import at.fhj.swengs.delorian.facade.UserRoleFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class UserRoleController {

    @Autowired
    private UserRoleFacade userRoleFacade;

    @GetMapping("/userroles/")
    ResponseEntity<List<UserRoleDTO>> getAllRoles() {
        List<UserRoleDTO> roles = userRoleFacade.getAllRoles();
        if(roles.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/userroles/{rolename}")
    ResponseEntity<UserRoleDTO> getById(@PathVariable String rolename) {
        Optional<UserRoleDTO> userRole = userRoleFacade.getByUsername(rolename);
        if(userRole.isPresent()) {
            return ResponseEntity.ok(userRole.get());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    //=== NOT USED IN FRONTEND - JUST GETTER required ===
    // Implementation just here because handling of userroles might be interesting in future
    // CREATE: Does not trigger errors, Role just not used in SecurityConfig for backend but can used in frontend.
    // Newly created UserRoles send in request, so might be used in Frontend for local security or something.

    // UPDATE: Does not trigger errors, just Description of role can be updated
    // Deletion of UserRoles will trigger errors. Roles used for SpringSecurity are protected and not
    // deletable. Ohter roles just deleted if not used by users.

    @PostMapping("/userroles")
    ResponseEntity<UserRoleDTO> create(@RequestBody @Valid UserRoleDTO dto) {
        return new ResponseEntity(userRoleFacade.create(dto),HttpStatus.CREATED);
    }


    @PutMapping("/userroles/{rolename}")
    ResponseEntity<UserRoleDTO> update(@RequestBody @Valid UserRoleDTO dto, @PathVariable String rolename) {
        Optional<UserRoleDTO> userRole = userRoleFacade.update(rolename, dto);
        if(userRole.isPresent()) {
            return ResponseEntity.ok(userRole.get());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/userroles/{rolename}")
    void delete(@RequestBody @Valid UserRoleDTO dto, @PathVariable String rolename) {
        userRoleFacade.delete(rolename);
    }
}
