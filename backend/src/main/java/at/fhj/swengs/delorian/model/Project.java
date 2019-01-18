package at.fhj.swengs.delorian.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String topic;

    private String description;

    @ManyToOne
    private User projectManager;

    private double totalPlannedHours;

    @Column(name = "active")
    private boolean active = true;


    @OneToMany(mappedBy = "project")
    private List<ProjectTime> projectTimes;


    // hoedlale16: according to Krausler we should implement a M2M Connection to have more flexiblity for future implmentations.
    @ManyToMany
    @JoinTable(name = "project_media", joinColumns = @JoinColumn(name = "project_id"), inverseJoinColumns = @JoinColumn(name = "media_id"))
    private Set<Media> mediaSet = new HashSet<>();


    @Version
    @JsonIgnore
    private long version;

    public Project(String topic, String description, User projectManager, double totalPlannedHours, List<ProjectTime> projectTimes) {
        this.topic = topic;
        this.description = description;
        this.projectManager = projectManager;
        this.totalPlannedHours = totalPlannedHours;
        this.projectTimes = projectTimes;
    }

    public Project(String topic, String description, User projectManager, double totalPlannedHours) {
        this.topic = topic;
        this.description = description;
        this.projectManager = projectManager;
        this.totalPlannedHours = totalPlannedHours;
    }

    public Project() {

    }

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

    public User getProjectManager() {
        return projectManager;
    }

    public void setProjectManager(User projectManager) {
        this.projectManager = projectManager;
    }

    public double getTotalPlannedHours() {
        return totalPlannedHours;
    }

    public void setTotalPlannedHours(double totalPlannedHours) {
        this.totalPlannedHours = totalPlannedHours;
    }

    public List<ProjectTime> getProjectTimes() {
        return projectTimes;
    }

    public void setProjectTimes(List<ProjectTime> projectTimes) {
        this.projectTimes = projectTimes;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Set<Media> getMediaSet() {
        return mediaSet;
    }

    public void setMediaSet(Set<Media> mediaSet) {
        this.mediaSet = mediaSet;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return id == project.id &&
                Objects.equals(topic, project.topic);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, topic);
    }
}

