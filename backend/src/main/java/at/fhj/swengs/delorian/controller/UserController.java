package at.fhj.swengs.delorian.controller;

import at.fhj.swengs.delorian.dto.UserDTO;
import at.fhj.swengs.delorian.facade.UserFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserFacade userFacade;

    @GetMapping("/users/")
    List<UserDTO> getAllUsers() {
        return userFacade.getAllUsers();
    }

    @GetMapping("/users/{username}")
    UserDTO getById(@PathVariable String username) {
        return userFacade.getByUsername(username);
    }

    @GetMapping("/usernameTaken/{username}")
    UserDTO isUsernameTaken(@PathVariable String username) {
        Optional<UserDTO> dto = userFacade.isUsernameTaken(username);
        if (dto.isPresent()) {
            return dto.get();
        }
        //TODO: schoener wer einen Fehlercode auch mitzuschicken!
        return null;
    }


    @PostMapping("/users")
    UserDTO create(@RequestBody @Valid UserDTO dto) {
        return userFacade.create(dto);
    }

    @PutMapping("/users/{username}")
    UserDTO update(@RequestBody @Valid UserDTO dto, @PathVariable String username) {
        return userFacade.update(username, dto);
    }

    @DeleteMapping("/users/{username}")
    void delete(@PathVariable String username) {
        userFacade.delete(username);
    }
}
