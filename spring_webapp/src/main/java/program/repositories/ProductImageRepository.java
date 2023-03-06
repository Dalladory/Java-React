package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.ProductImageEntity;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImageEntity,Integer> {
}
