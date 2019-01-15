package at.fhj.swengs.delorian.controller;

import at.fhj.swengs.delorian.dto.ProjectDTO;
import at.fhj.swengs.delorian.facade.ProjectFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ProjectController {

    @Autowired
    private ProjectFacade projectFacade;

    /**
     * hoedlale16: Return list of projects. If filter option is given, return detailed information
     * of projects. otherwhise jst return header information of projects.
     * @param projectManager
     * @return
     */
    @GetMapping("/projects")
    ResponseEntity<List<ProjectDTO>> getProjects(@RequestParam Optional<String> projectManager) {
        List<ProjectDTO> projects = new ArrayList<>();
        if(projectManager.isPresent()) {
            // Verfiy that logged in user from JWT is projectManager. Otherwise send him to hell...
            String authenticatedUsername = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
            if (projectManager.get().equals(authenticatedUsername)) {
                projects.addAll(projectFacade.getAllProjectsOfPrjMgr(projectManager.get()));
            }
        } else {
            //Add all Projects but just meta data (id + topic)
            projects.addAll(projectFacade.getAllProjects(false));
        }

        //Retrun list.
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
    ResponseEntity<ProjectDTO> create(@RequestBody @Valid ProjectDTO dto) {
        return new ResponseEntity(projectFacade.create(dto),HttpStatus.CREATED);
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
