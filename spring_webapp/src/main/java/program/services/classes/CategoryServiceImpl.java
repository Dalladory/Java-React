package program.services.classes;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import program.dto.category.CategoryDTO;
import program.dto.ResponseDTO;
import program.dto.category.CreateCategoryDTO;
import program.dto.category.UpdateCategoryDTO;
import program.entities.CategoryEntity;
import program.repositories.CategoryRepository;
import program.services.interfaces.CategoryService;
import program.storage.StorageService;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    CategoryRepository categoryRepository;
    private StorageService storageService;
    ModelMapper modelMapper;
    @Override
    public ResponseDTO GetAll() {
        try {
            var categories =  categoryRepository.findAll();
            List<CategoryDTO> mappedCategories = modelMapper.map(categories, new TypeToken<List<CategoryDTO>>(){}.getType());
            return new ResponseDTO(true, mappedCategories, "Success");
        }
        catch (Exception ex) {
            return new ResponseDTO(false, null, ex.getMessage());
        }
    }

    @Override
    public ResponseDTO GetById(int id) {
        try{
            var category = categoryRepository.findById(id).get();
            if(category == null) {
                return new ResponseDTO(true, null, "There is no category with this id");

            }
            var mappedCategory = modelMapper.map(category, CategoryDTO.class);
            return new ResponseDTO(true, mappedCategory, "Success");
        }
        catch(Exception ex) {
            return new ResponseDTO(true, null, ex.getMessage());
        }
    }

    @Override
    public ResponseDTO CreateCategory(CreateCategoryDTO model) {
        try {
            var newCategory = modelMapper.map(model, CategoryEntity.class);
            var modelImage = model.getImage();
            if(modelImage != null) {
                String imageName = storageService.save(modelImage);
                newCategory.setImage(imageName);
            }
            categoryRepository.save(newCategory);
            return new ResponseDTO(true, null, "Success");
        } catch (Exception ex) {
            return new ResponseDTO(false, null, ex.getMessage());
        }
    }

    @Override
    public ResponseDTO UpdateCategory(UpdateCategoryDTO model) {
        try {
            var category = categoryRepository.findById(model.getId()).get();
            if(category == null) {
                return new ResponseDTO(true, null, "There is no category with this id");
            }
            var newCategory = modelMapper.map(model, CategoryEntity.class);
            var modelImage = model.getImage();
            if(modelImage == null) {
                storageService.delete(category.getImage());
                newCategory.setImage(null);
            }
            if(model.getNewImage() != null) {
                if(model.getImage() != null)
                    storageService.delete(category.getImage());
                String newImage = storageService.save(model.getNewImage());
                newCategory.setImage(newImage);
            }
            
            categoryRepository.save(newCategory);
            return new ResponseDTO(true, null, "Success");
        }
        catch (Exception ex) {
            return new ResponseDTO(false, null, ex.getMessage());
        }
    }

    @Override
    public ResponseDTO DeleteCategory(int id) {
        try{
            var category = categoryRepository.findById(id).get();
            if(category == null) {
                return new ResponseDTO(true, null, "There is no category with this id");
            }
            var image = category.getImage();
            if(image != null && image != "") {
                storageService.delete(category.getImage());
            }
            categoryRepository.deleteById(id);
            return new ResponseDTO(true, null, "Success");
        }
        catch (Exception ex) {
            return new ResponseDTO(false, null, ex.getMessage());
        }
    }
}
