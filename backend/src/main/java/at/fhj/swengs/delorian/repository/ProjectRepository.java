package at.fhj.swengs.delorian.repository;

import at.fhj.swengs.delorian.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
@Transactional(isolation = Isolation.READ_COMMITTED)
public interface ProjectRepository extends PagingAndSortingRepository<Project, Long>, JpaRepository<Project, Long>, CrudRepository<Project, Long> {

    public Optional<Project> findByIdAndActiveTrue(@Param("id") long id);

    public List<Project> findAllByActiveTrue();

    public List<Project> findProjectsByActiveTrueAndProjectManagerUserName(@Param("userName") String prjMgrUserName);
}