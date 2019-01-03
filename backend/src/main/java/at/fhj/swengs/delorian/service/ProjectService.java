package at.fhj.swengs.delorian.service;

import at.fhj.swengs.delorian.model.Project;
import at.fhj.swengs.delorian.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service()
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project save(Project entity) {
        return projectRepository.save(entity);
    }

    //No deletion of projects possible - just update active flag of project
    public  void delete(long projectId) {
        Optional<Project> optEntity  = findById(projectId);
        if(optEntity.isPresent()) {
            Project entity = optEntity.get();
            entity.setActive(false);
            save(entity);
        }
    }

    public Optional<Project> findById(long projectId) {
        return projectRepository.findById(projectId);
    }

    public Set<Project> getProjectsByID(Set<Long> dtos) {
        Set<Project> entities = new HashSet<>();
        if (dtos != null) {
            dtos.forEach((dto) -> entities.add(projectRepository.findByIdAndActiveTrue(dto).get()));
        }
        return entities;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAllByActiveTrue();
    }

    public List<Project> getAllProjectsOfPrjMgr(String prjMgrUserName) {
        return projectRepository.findProjectsByActiveTrueAndProjectManagerUserName(prjMgrUserName);
    }

}
