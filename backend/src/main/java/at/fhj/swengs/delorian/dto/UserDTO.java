package at.fhj.swengs.delorian.dto;

import java.util.List;
import java.util.Set;

public class UserDTO {

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String eMail;

    private Set<String> userRoles;
    private Set<Long> managedProjects;

    private Set<Long> projectTimes;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
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

    public Set<String> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<String> userRoles) {
        this.userRoles = userRoles;
    }

    public Set<Long> getManagedProjects() {
        return managedProjects;
    }

    public void setManagedProjects(Set<Long> managedProjects) {
        this.managedProjects = managedProjects;
    }

    public Set<Long> getProjectTimes() {
        return projectTimes;
    }

    public void setProjectTimes(Set<Long> projectTimes) {
        this.projectTimes = projectTimes;
    }
}
