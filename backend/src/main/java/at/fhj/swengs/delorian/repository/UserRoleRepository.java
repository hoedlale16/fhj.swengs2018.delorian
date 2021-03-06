package at.fhj.swengs.delorian.repository;

import at.fhj.swengs.delorian.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@RepositoryRestResource
@Transactional(isolation = Isolation.READ_COMMITTED)
public interface UserRoleRepository extends PagingAndSortingRepository<Role, String>, JpaRepository<Role, String>, CrudRepository<Role, String> {

}

