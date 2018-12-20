package at.fhj.swengs.delorian.service;

import at.fhj.swengs.delorian.model.ProjectTime;
import at.fhj.swengs.delorian.repository.ProjectTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service()
public class ProjectTimeService {

    @Autowired
    private ProjectTimeRepository projectTimeRepository;

    public List<ProjectTime> getProjectTimes(List<Long> dtos) {
        List<ProjectTime> entities = new ArrayList<>();
        if (dtos != null) {
            dtos.forEach((dto) -> entities.add(projectTimeRepository.findById(dto).get()));
        }
        return entities;
    }
}
