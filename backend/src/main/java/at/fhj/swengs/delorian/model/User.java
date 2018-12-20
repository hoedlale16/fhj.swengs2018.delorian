package at.fhj.swengs.delorian.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "userName")
public class User {

    @Id
    @Column(length = 100)
    private String userName;

    private String firstName;

    private String lastName;

    private String password;

    private String eMail;

    @ManyToMany(mappedBy = "users")
    private Set<Role> userRoles;

    @OneToMany(mappedBy = "projectManager")
    private Set<Project> managedProjects;

    @OneToMany(mappedBy = "user")
    private List<ProjectTime> projectTimes;

    @Version
    @JsonIgnore
    private long version;

    public User(String userName, String firstName, String lastName, String password, String eMail, Set<Role> userRoles) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.eMail = eMail;
        this.userRoles = userRoles;
    }

    public User(String userName, String firstName, String lastName, String password, String eMail, Set<Role> userRoles, Set<Project> managedProjects, List<ProjectTime> projectTimes) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.eMail = eMail;
        this.userRoles = userRoles;
        this.managedProjects = managedProjects;
        this.projectTimes = projectTimes;
    }

    public User() {
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public Set<Role> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<Role> userRoles) {
        this.userRoles = userRoles;
    }

    public Set<Project> getManagedProjects() {
        return managedProjects;
    }

    public void setManagedProjects(Set<Project> managedProjects) {
        this.managedProjects = managedProjects;
    }

    public List<ProjectTime> getProjectTimes() {
        return projectTimes;
    }

    public void setProjectTimes(List<ProjectTime> projectTimes) {
        this.projectTimes = projectTimes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(userName, user.userName) &&
                Objects.equals(firstName, user.firstName) &&
                Objects.equals(lastName, user.lastName) &&
                Objects.equals(password, user.password) &&
                Objects.equals(eMail, user.eMail) &&
                Objects.equals(userRoles, user.userRoles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userName, firstName, lastName, password, eMail, userRoles);
    }
}
