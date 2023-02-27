package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import program.entities.CategoryEntity;

import java.io.Serializable;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
}
