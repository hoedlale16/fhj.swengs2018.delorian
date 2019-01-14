package at.fhj.swengs.delorian.repository;

import at.fhj.swengs.delorian.model.User;
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
public interface UserRepository extends PagingAndSortingRepository<User, String>, JpaRepository<User, String>, CrudRepository<User, String> {

    public Optional<User> findByUserNameAndActiveTrue(@Param("username") String username);

    public List<User> findAllByActiveTrue();
}

