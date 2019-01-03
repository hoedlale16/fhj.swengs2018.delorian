package at.fhj.swengs.delorian.service;

import at.fhj.swengs.delorian.model.ProjectTime;
import at.fhj.swengs.delorian.repository.ProjectTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service()
public class ProjectTimeService {

    @Autowired
    private ProjectTimeRepository projectTimeRepository;

    public ProjectTime save(ProjectTime entity) {
        return projectTimeRepository.save(entity);
    }

    public void delete(long projectTimeID) {
        projectTimeRepository.deleteById(projectTimeID);
    }

    public Optional<ProjectTime> findById(long projectTimeID) {
        return projectTimeRepository.findById(projectTimeID);
    }

    public List<ProjectTime> getAllProjectTimesOfProject(long projectID) {
        return projectTimeRepository.findProjectTimesByProjectIdAndProjectActiveTrue(projectID);
    }

    public List<ProjectTime> getAllProjectTimesOfUser(String username) {
        return projectTimeRepository.findProjectTimesByUserUserNameAndProjectActiveTrue(username);
    }

    //Not secure. Just return either all project times of a user or all project times of a project
    /*public List<ProjectTime> getAllProjectTimes() {
        return projectTimeRepository.findAll();
    }*/

    public List<ProjectTime> getProjectTimes(Set<Long> dtos) {
        List<ProjectTime> entities = new ArrayList<>();
        if (dtos != null) {
            dtos.forEach((dto) -> entities.add(projectTimeRepository.findById(dto).get()));
        }
        return entities;
    }
}
