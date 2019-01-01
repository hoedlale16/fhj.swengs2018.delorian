package at.fhj.swengs.delorian.controller;

import at.fhj.swengs.delorian.dto.ProjectDTO;
import at.fhj.swengs.delorian.facade.ProjectFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ProjectController {

    @Autowired
    private ProjectFacade projectFacade;

    //Not secure enough. just support list of project for a specific project manager!
    //@GetMapping("/projects/")
    //List<ProjectDTO> getAllProjects() { return projectFacade.getAllProjects(); }

    @GetMapping("/projectsPrjMgr/{projectManager}")
    List<ProjectDTO> getProjectsOfPrjMgr(@PathVariable String projectManager) {
        return projectFacade.getAllProjectsOfPrjMgr(projectManager);
    }

    @GetMapping("/projects/{projectID}")
    ProjectDTO getById(@PathVariable long projectID) {
        return projectFacade.getProjectByID(projectID);
    }

    @PostMapping("/projects")
    ProjectDTO create(@RequestBody @Valid ProjectDTO dto) {
        return projectFacade.create(dto);
    }

    @PutMapping("/projects/{projectID}")
    ProjectDTO update(@RequestBody @Valid ProjectDTO dto, @PathVariable long projectID) {
        return projectFacade.update(projectID, dto);
    }

    @DeleteMapping("/projects/{projectID}")
    void delete(@PathVariable long projectID) {
        projectFacade.delete(projectID);
    }
}
