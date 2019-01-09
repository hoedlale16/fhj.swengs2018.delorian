package at.fhj.swengs.delorian.facade;

import at.fhj.swengs.delorian.dto.ProjectTimeDTO;
import at.fhj.swengs.delorian.model.ProjectTime;
import at.fhj.swengs.delorian.service.ProjectService;
import at.fhj.swengs.delorian.service.ProjectTimeService;
import at.fhj.swengs.delorian.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProjectTimeFacade {

    @Autowired
    private ProjectTimeService projectTimeService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    private void mapDtoToEntity(ProjectTimeDTO dto, ProjectTime entity) {
        entity.setId(dto.getId());
        entity.setProject(projectService.findById(dto.getProjectID()).get());
        entity.setUser(userService.findActiveUserByUsername(dto.getUsername()).get());
        entity.setTrackingDate(dto.getTrackingDate());
        entity.setWorkedHours(dto.getWorkedHours());
    }

    private void mapEntityToDto(ProjectTime entity, ProjectTimeDTO dto) {
        dto.setId(entity.getId());
        dto.setProjectID(entity.getProject().getId());
        dto.setUsername(entity.getUser().getUserName());
        dto.setTrackingDate(entity.getTrackingDate());
        dto.setWorkedHours(entity.getWorkedHours());
    }

    public ProjectTimeDTO create(ProjectTimeDTO dto) {
        ProjectTime entity = new ProjectTime();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(projectTimeService.save(entity), dto);
        return dto;
    }

    public ProjectTimeDTO update(long projectTimeID, ProjectTimeDTO dto) {
        ProjectTime entity  = projectTimeService.findById(projectTimeID).get();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(projectTimeService.save(entity), dto);
        return dto;

    }

    public void delete(long projectTimeID) {
        projectTimeService.delete(projectTimeID);
    }

    public ProjectTimeDTO getProjectTimeByID(long projectTimeID) {
        ProjectTime entity = projectTimeService.findById(projectTimeID).get();
        ProjectTimeDTO dto = new ProjectTimeDTO();
        mapEntityToDto(entity, dto);
        return dto;
    }

    public List<ProjectTimeDTO> getProjectTimesOfProject(long projectID) {
        List<ProjectTimeDTO> projects = new ArrayList<ProjectTimeDTO>();

        projectTimeService.getAllProjectTimesOfProject(projectID).forEach(entity -> {
            ProjectTimeDTO dto = new ProjectTimeDTO();
            mapEntityToDto(entity,dto);
            projects.add(dto);
        });

        return projects;
    }

    public List<ProjectTimeDTO> getProjectTimesOfUser(String username) {
        List<ProjectTimeDTO> projects = new ArrayList<ProjectTimeDTO>();

        projectTimeService.getAllProjectTimesOfUser(username).forEach(entity -> {
            ProjectTimeDTO dto = new ProjectTimeDTO();
            mapEntityToDto(entity,dto);
            projects.add(dto);
        });

        return projects;
    }


}
