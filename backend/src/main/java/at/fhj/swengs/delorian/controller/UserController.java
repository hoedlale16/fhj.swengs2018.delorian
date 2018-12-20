package at.fhj.swengs.delorian.controller;

import at.fhj.swengs.delorian.dto.UserDTO;
import at.fhj.swengs.delorian.facade.UserFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class UserController {

    @Autowired
    private UserFacade userFacade;

    @GetMapping("/users/{username}")
    UserDTO getById(@PathVariable String username) {
        return userFacade.getByUsername(username);
    }

    @PostMapping("/users")
    UserDTO  create(@RequestBody @Valid UserDTO dto) {
        return userFacade.create(dto);
    }

    @PutMapping("/users/{username}")
    UserDTO update(@RequestBody @Valid UserDTO dto, @PathVariable String username) {
        return userFacade.update(username, dto);
    }
}
