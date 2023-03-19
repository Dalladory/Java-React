package program.services.interfaces;

import program.dto.category.CategoryDTO;
import program.dto.ResponseDTO;
import program.dto.category.CreateCategoryDTO;
import program.dto.category.UpdateCategoryDTO;

public interface CategoryService {
    ResponseDTO GetAll();
    ResponseDTO GetById(int id);
    ResponseDTO CreateCategory(CreateCategoryDTO model);
    ResponseDTO UpdateCategory(UpdateCategoryDTO model);
    ResponseDTO DeleteCategory(int id);
}
