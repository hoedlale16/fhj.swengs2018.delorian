package at.fhj.swengs.delorian.controller;

import at.fhj.swengs.delorian.dto.ProjectTimeDTO;
import at.fhj.swengs.delorian.facade.ProjectTimeFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class ProjectTimeController {

    @Autowired
    private ProjectTimeFacade projectTimeFacade;

    //Not secure enough. project Times must either filterd for a specific user or specific prooject...
    /*@GetMapping("/projectTimes/")
    List<UserDTO> getAllUsers() {
        return userFacade.getAllUsers();
    }*/

    @GetMapping("/projectTimesProject/{projectID}")
    ResponseEntity<List<ProjectTimeDTO>> getProjectTimesOfProject(@PathVariable long projectID) {
        List<ProjectTimeDTO> projectTimes = projectTimeFacade.getProjectTimesOfProject(projectID);
        if(projectTimes.isEmpty())
            return  new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return ResponseEntity.ok(projectTimes);
    }

    @GetMapping("/projectTimesUser/{username}")
    ResponseEntity<List<ProjectTimeDTO>> getProjectTimesOfUser(@PathVariable String username) {
        List<ProjectTimeDTO> projectTimes = projectTimeFacade.getProjectTimesOfUser(username);
        if(projectTimes.isEmpty())
            return  new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return ResponseEntity.ok(projectTimes);
    }


    @GetMapping("/projectTimes/{projectTimeID}")
    ResponseEntity<ProjectTimeDTO> getById(@PathVariable long projectTimeID) {

        Optional<ProjectTimeDTO> projectTimeDTO =  projectTimeFacade.getProjectTimeByID(projectTimeID);
        if(projectTimeDTO.isPresent()) {
            return ResponseEntity.ok(projectTimeDTO.get());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/projectTimes")
    ProjectTimeDTO create(@RequestBody @Valid ProjectTimeDTO dto) {
        return projectTimeFacade.create(dto);
    }

    @PutMapping("/projectTimes/{projectTimeID}")
    ResponseEntity<ProjectTimeDTO> update(@RequestBody @Valid ProjectTimeDTO dto, @PathVariable long projectTimeID) {
        Optional<ProjectTimeDTO> projectTimeDTO =  projectTimeFacade.update(projectTimeID, dto);
        if(projectTimeDTO.isPresent()) {
            return ResponseEntity.ok(projectTimeDTO.get());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/projectTimes/{projectTimeID}")
    void delete(@PathVariable long projectTimeID) {
        projectTimeFacade.delete(projectTimeID);
    }

}
