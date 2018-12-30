package at.fhj.swengs.delorian.service;

import at.fhj.swengs.delorian.model.Role;
import at.fhj.swengs.delorian.repository.UserRepository;
import at.fhj.swengs.delorian.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service("userDetailsService")   // It has to be annotated with @Service.
public class AuthenticationService implements UserDetailsService {

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            System.out.println("loadUserByUsername <" + username + ">");
            // 1. Get User by given username
            Optional<at.fhj.swengs.delorian.model.User> optUser = userRepository.findById(username);
            if (optUser.isPresent()) {
                at.fhj.swengs.delorian.model.User user = optUser.get();

                // 2. Set all assigned Roles of user to 'grandedAuthorities' list
                Set<String> userRoles = user.getUserRoles().stream().map(r -> r.getRoleName()).collect(Collectors.toSet());
                List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList(String.join(",", userRoles));

                // 3. Return new user with password and grandtedAuthroties
                // The "User" class is provided by Spring and represents a model class for user to be returned by UserDetailsService
                // And used by auth manager to verify and check user authentication.
                return new User(user.getUserName(), user.getPassword(), grantedAuthorities);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // If user not found. Throw this exception.
        throw new UsernameNotFoundException("Username: " + username + " not found");
    }

    @PostConstruct()
    @Transactional
    public void initUsers() {



        //1. Create ROLE_ADMIN, ROLE_PROJECTMGR, ROLE_USER if not exists
        if(userRoleRepository.count() == 0) {
            //Create Role ROlE_ADMIN
            Role rAdmin = new Role("ROLE_ADMIN", "The role allows to manage the application");
            userRoleRepository.save(rAdmin);

            Role rPrjManager = new Role("ROLE_PRJMGR","The role alloews to create new projects and modify/delete assigned ones");
            userRoleRepository.save(rPrjManager);

            Role rUser = new Role("ROLE_USER", "Default role of user, allows to add working times to projects");
            userRoleRepository.save(rUser);
        }

        //2. Create User admin/delorian user if not exists
        if(userRepository.count() == 0) {
            at.fhj.swengs.delorian.model.User uAdmin = new at.fhj.swengs.delorian.model.User();

            //Set Meta data of user
            uAdmin.setUserName("admin");
            uAdmin.setPassword(encoder.encode("delorian"));
            uAdmin.setFirstName("Martin");
            uAdmin.setLastName("McFly");
            uAdmin.seteMail("admin@delorian.at");

            //Set assigned Roles
            Set<Role> allRoles = userRoleRepository.findAll().stream().collect(Collectors.toSet());
            uAdmin.setUserRoles(allRoles);

            userRepository.save(uAdmin);

        }
    }

}