package at.fhj.swengs.delorian.controller;

import at.fhj.swengs.delorian.dto.ProjectTimeDTO;
import at.fhj.swengs.delorian.facade.ProjectTimeFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
    List<ProjectTimeDTO> getProjectTimesOfProject(@PathVariable long projectID) {
        return projectTimeFacade.getProjectTimesOfProject(projectID);
    }

    @GetMapping("/projectTimesUser/{username}")
    List<ProjectTimeDTO> getProjectTimesOfUser(@PathVariable String username) {
        return projectTimeFacade.getProjectTimesOfUser(username);
    }


    @GetMapping("/projectTimes/{projectTimeID}")
    ProjectTimeDTO getById(@PathVariable long projectTimeID) {
        return projectTimeFacade.getProjectTimeByID(projectTimeID);
    }

    @PostMapping("/projectTimes")
    ProjectTimeDTO create(@RequestBody @Valid ProjectTimeDTO dto) {
        return projectTimeFacade.create(dto);
    }

    @DeleteMapping("/projectTimes/{projectTimeID}")
    void delete(@PathVariable long projectTimeID) {
        projectTimeFacade.delete(projectTimeID);
    }

}
