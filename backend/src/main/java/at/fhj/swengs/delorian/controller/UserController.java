package at.fhj.swengs.delorian.controller;

import at.fhj.swengs.delorian.dto.UserDTO;
import at.fhj.swengs.delorian.facade.UserFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserFacade userFacade;

    @GetMapping("/users/")
    ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userFacade.getAllUsers();
        if(users.isEmpty())
            return  new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{username}")
    ResponseEntity<UserDTO> getById(@PathVariable String username) {
        Optional<UserDTO> dto = userFacade.getByUsername(username);
        if (dto.isPresent()) {
            return ResponseEntity.ok(dto.get());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/usernameTaken/{username}")
    ResponseEntity<UserDTO> isUsernameTaken(@PathVariable String username) {

        Optional<UserDTO> dto = userFacade.isUsernameTaken(username);
        if (dto.isPresent()) {
            return ResponseEntity.ok(dto.get());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PostMapping("/users")
    UserDTO create(@RequestBody @Valid UserDTO dto) {
        return userFacade.create(dto);
    }

    @PutMapping("/users/{username}")
    ResponseEntity<UserDTO> update(@RequestBody @Valid UserDTO dto, @PathVariable String username) {
        Optional<UserDTO> optDto = userFacade.update(username, dto);
        if (optDto.isPresent()) {
            return ResponseEntity.ok(optDto.get());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/users/{username}")
    void delete(@PathVariable String username) {
        userFacade.delete(username);
    }
}
