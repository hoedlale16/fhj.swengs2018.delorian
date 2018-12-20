package at.fhj.swengs.delorian.controller;

import at.fhj.swengs.delorian.dto.UserRoleDTO;
import at.fhj.swengs.delorian.facade.UserRoleFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class UserRoleController {

    @Autowired
    private UserRoleFacade userRoleFacade;

    @GetMapping("/userroles/")
    List<UserRoleDTO> getAllRoles() {
        return userRoleFacade.getAllRoles();
    }

    @GetMapping("/userroles/{rolename}")
    UserRoleDTO getById(@PathVariable String rolename) {
        return userRoleFacade.getByUsername(rolename);
    }

    @PostMapping("/userroles")
    UserRoleDTO create(@RequestBody @Valid UserRoleDTO dto) {
        return userRoleFacade.create(dto);
    }

    @PutMapping("/userroles/{rolename}")
    UserRoleDTO update(@RequestBody @Valid UserRoleDTO dto, @PathVariable String rolename) {
        return userRoleFacade.update(rolename, dto);
    }

    @DeleteMapping("/userroles/{rolename}")
    void delete(@RequestBody @Valid UserRoleDTO dto, @PathVariable String rolename) {
        userRoleFacade.delete(rolename);
    }
}
