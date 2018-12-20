package at.fhj.swengs.delorian.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class ProjectTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Project project;

    @ManyToOne
    private User user;

    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern="dd.MM.yyyy")
    @Temporal(TemporalType.TIMESTAMP)
    private Date trackingDate;

    private double workedHours;

    @Version
    @JsonIgnore
    private long version;

    public ProjectTime(Project project, User user, Date trackingDate, double workedHours) {
        this.project = project;
        this.user = user;
        this.trackingDate = trackingDate;
        this.workedHours = workedHours;
    }

    public ProjectTime() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getTrackingDate() {
        return trackingDate;
    }

    public void setTrackingDate(Date trackingDate) {
        this.trackingDate = trackingDate;
    }

    public double getWorkedHours() {
        return workedHours;
    }

    public void setWorkedHours(double workedHours) {
        this.workedHours = workedHours;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProjectTime that = (ProjectTime) o;
        return Objects.equals(project, that.project) &&
                Objects.equals(user, that.user) &&
                Objects.equals(trackingDate, that.trackingDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(project, user, trackingDate);
    }
}
