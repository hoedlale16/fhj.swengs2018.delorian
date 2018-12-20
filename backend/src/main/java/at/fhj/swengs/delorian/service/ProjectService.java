package at.fhj.swengs.delorian.service;

import at.fhj.swengs.delorian.model.Project;
import at.fhj.swengs.delorian.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service()
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Set<Project> getProjectsByID(Set<Long> dtos) {
        Set<Project> entities = new HashSet<>();
        if (dtos != null) {
            dtos.forEach((dto) -> entities.add(projectRepository.findById(dto).get()));
        }
        return entities;
    }
}
