package at.fhj.swengs.delorian.controller;

import at.fhj.swengs.delorian.dto.ProjectDTO;
import at.fhj.swengs.delorian.facade.ProjectFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class ProjectController {

    @Autowired
    private ProjectFacade projectFacade;

    /**
     * /projects/ is allowed for all authenticated users. Therefore just send metaInfos of projects.
     * @return
     */
    @GetMapping("/projects/")
    ResponseEntity<List<ProjectDTO>> getAllProjects() {
        List<ProjectDTO> projects = projectFacade.getAllProjects(false);
        if(projects.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(projects);
    }

    /*hoedlale16: I know we should use @RequestParam and filter for projectManager instead of this call
    but I think it is more secure to have two requests because every user is allowed to trigger /projects/ because
    it is required for boooking. Therefore the DTOs in /projects/ jut contains the projectnames and
    /projectsPrjMgr/{projectManager} continas the full project information.
    */
    @GetMapping("/projectsPrjMgr/{projectManager}")
    ResponseEntity<List<ProjectDTO>> getProjectsOfPrjMgr(@PathVariable String projectManager) {
        List<ProjectDTO> projects = projectFacade.getAllProjectsOfPrjMgr(projectManager);
        if(projects.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/projects/{projectID}")
    ResponseEntity<ProjectDTO> getById(@PathVariable long projectID) {
        Optional<ProjectDTO> projectDTO =  projectFacade.getProjectByID(projectID);
        if(projectDTO.isPresent()) {
            return ResponseEntity.ok(projectDTO.get());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/projects")
    ProjectDTO create(@RequestBody @Valid ProjectDTO dto) {
        return projectFacade.create(dto);
    }

    @PutMapping("/projects/{projectID}")
    ResponseEntity<ProjectDTO> update(@RequestBody @Valid ProjectDTO dto, @PathVariable long projectID) {
        Optional<ProjectDTO> projectDTO =  projectFacade.update(projectID, dto);
        if(projectDTO.isPresent()) {
            return ResponseEntity.ok(projectDTO.get());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/projects/{projectID}")
    void delete(@PathVariable long projectID) {
        projectFacade.delete(projectID);
    }
}
