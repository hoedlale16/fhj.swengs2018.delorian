package at.fhj.swengs.delorian.facade;

import at.fhj.swengs.delorian.dto.ProjectDTO;
import at.fhj.swengs.delorian.model.Project;
import at.fhj.swengs.delorian.model.User;
import at.fhj.swengs.delorian.service.ProjectService;
import at.fhj.swengs.delorian.service.ProjectTimeService;
import at.fhj.swengs.delorian.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service()
@Transactional
public class ProjectFacade {


    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ProjectTimeService projectTimeService;

    private void mapDtoToEntity(ProjectDTO dto, Project entity) {

        entity.setId(dto.getId());
        entity.setTopic(dto.getTopic());
        entity.setDescription(dto.getDescription());

        // Projects comming from frontent are always active!
        entity.setActive(true);

        Optional<User> optPrjMgr = userService.findByUserName(dto.getProjectManager());
        if(((Optional) optPrjMgr).isPresent()) {
            entity.setProjectManager(optPrjMgr.get());
        }

        entity.setTotalPlannedHours(dto.getTotalPlannedHours());
        entity.setProjectTimes(projectTimeService.getProjectTimes(dto.getProjectTimes()));
    }

    private void mapEntityToDto(Project entity, ProjectDTO dto, boolean fullDetails) {
        dto.setId(entity.getId());
        dto.setTopic(entity.getTopic());
        if(fullDetails) {
            dto.setDescription(entity.getDescription());
            dto.setProjectManager(entity.getProjectManager().getUserName());
            dto.setTotalPlannedHours(entity.getTotalPlannedHours());
            dto.setProjectTimes(entity.getProjectTimes().stream().map(pt -> pt.getId()).collect(Collectors.toSet()));
        }
    }

    public ProjectDTO create(ProjectDTO dto) {
        Project entity = new Project();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(projectService.save(entity), dto, true);
        return dto;
    }

    public ProjectDTO update(long projectId, ProjectDTO dto) {
        Project entity  = projectService.findById(projectId).get();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(projectService.save(entity), dto, true);
        return dto;

    }

    public void delete(long projectID) {
        //We will not delete projects from database just set them inactive
        //projectService will handle that...
        projectService.delete(projectID);
    }

    public ProjectDTO getProjectByID(long projectId) {
        Project entity = projectService.findById(projectId).get();
        ProjectDTO dto = new ProjectDTO();
        mapEntityToDto(entity, dto,true);
        return dto;
    }

    public List<ProjectDTO> getAllProjects(boolean withAllInfos) {
        List<ProjectDTO> projects = new ArrayList<ProjectDTO>();

        projectService.getAllProjects().forEach(entity -> {
            ProjectDTO dto = new ProjectDTO();
            mapEntityToDto(entity,dto,withAllInfos);
            projects.add(dto);
        });

        return projects;
    }

    public List<ProjectDTO> getAllProjectsOfPrjMgr(String prjMgrUserName) {
        List<ProjectDTO> projects = new ArrayList<ProjectDTO>();

        projectService.getAllProjectsOfPrjMgr(prjMgrUserName).forEach(entity -> {
            ProjectDTO dto = new ProjectDTO();
            mapEntityToDto(entity,dto,true);
            projects.add(dto);
        });

        return projects;
    }

}
