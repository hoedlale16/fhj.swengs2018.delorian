package at.fhj.swengs.delorian.dto;

import java.util.Set;

public class UserRoleDTO {

    private String roleName;
    private String description;
    private Set<String> assignedUsers;

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<String> getAssignedUsers() {
        return assignedUsers;
    }

    public void setAssignedUsers(Set<String> assignedUsers) {
        this.assignedUsers = assignedUsers;
    }
}
