package program.services.interfaces;

import org.springframework.http.ResponseEntity;
import program.dto.CategoryDTO;
import program.dto.ResponseDTO;

import java.util.List;

public interface CategoryService {
    ResponseDTO GetAll();
    ResponseDTO GetById(int id);
    ResponseDTO CreateCategory(CategoryDTO model);
    ResponseDTO UpdateCategory(CategoryDTO model);
    ResponseDTO DeleteCategory(int id);
}
