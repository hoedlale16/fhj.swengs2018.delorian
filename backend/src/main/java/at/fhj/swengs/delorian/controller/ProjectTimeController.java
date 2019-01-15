package at.fhj.swengs.delorian.controller;

import at.fhj.swengs.delorian.dto.ProjectTimeDTO;
import at.fhj.swengs.delorian.facade.ProjectTimeFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ProjectTimeController {

    @Autowired
    private ProjectTimeFacade projectTimeFacade;

    /* hoedlale16: Not secure enough to return all project Times.
       Either filterd for a specific project or user.
         -- If project times for a specific project are requested, authenticated user must be project manger of project
         -- If project times for a specific user are requested, authenticated user must be request username
       Otherwhise return 'NO_CONTENT'
    */
    @GetMapping("/projectTimes")
    ResponseEntity<List<ProjectTimeDTO>> getAllUsers(@RequestParam Optional<Long> projectID, @RequestParam Optional<String> username) {
        List<ProjectTimeDTO> projectTimes = new ArrayList<>();
        String authenticatedUsername = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        //Fill either for projectID or for projectMgr...
        if(projectID.isPresent()) {
            projectTimes.addAll(projectTimeFacade.getProjectTimesOfProject(projectID.get(),authenticatedUsername));
        } else if(username.isPresent() && username.get().equals(authenticatedUsername)) {
            projectTimes.addAll(projectTimeFacade.getProjectTimesOfUser(username.get()));
        }

        //Return list
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
    ResponseEntity<ProjectTimeDTO> create(@RequestBody @Valid ProjectTimeDTO dto) {
        return new ResponseEntity(projectTimeFacade.create(dto), HttpStatus.CREATED);
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
