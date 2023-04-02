package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import program.entities.UserEntity;
import program.entities.UserRoleEntity;
import program.entities.UserRolePK;

import java.util.List;
import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRoleEntity, UserRolePK> {
    List<UserRoleEntity> findByUser(UserEntity User);
}