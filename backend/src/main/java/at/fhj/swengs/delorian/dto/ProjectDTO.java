package at.fhj.swengs.delorian.dto;

import java.util.Set;

public class ProjectDTO {

    private long id;
    private String topic;
    private String description;
    private String projectManager;
    private double totalPlannedHours;
    private Set<Long> projectTimes;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProjectManager() {
        return projectManager;
    }

    public void setProjectManager(String projectManager) {
        this.projectManager = projectManager;
    }

    public double getTotalPlannedHours() {
        return totalPlannedHours;
    }

    public void setTotalPlannedHours(double totalPlannedHours) {
        this.totalPlannedHours = totalPlannedHours;
    }

    public Set<Long> getProjectTimes() {
        return projectTimes;
    }

    public void setProjectTimes(Set<Long> projectTimes) {
        this.projectTimes = projectTimes;
    }
}
