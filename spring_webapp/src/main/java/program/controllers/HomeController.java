package program.controllers;

import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.ArrayUtils;
import program.dto.CategoryDTO;
import program.dto.CustomResponseEntityExceptionHandler;
import program.dto.ResponseDTO;
import program.entities.CategoryEntity;
import program.repositories.CategoryRepository;
import program.storage.StorageService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Validated
@ControllerAdvice
@RestController
@AllArgsConstructor
@RequestMapping("/api/category")
public class HomeController {

    private CategoryRepository categoryRepository;
    private StorageService storageService;

    private ModelMapper modelMapper = new ModelMapper();
    private static List<CategoryDTO> list = new ArrayList<CategoryDTO>();

    @GetMapping("")
    public ResponseEntity<ResponseDTO> index() {
        var categories = categoryRepository.findAll();
        List<CategoryDTO> mappedCategories2 = modelMapper.map(categories, new TypeToken<List<CategoryDTO>>(){}.getType());

        var result = new ResponseDTO(true, mappedCategories2, "Success");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("create")
    public ResponseEntity<ResponseDTO> Create(@Valid @RequestBody  CategoryDTO model) {
        try {
            if(model.getImage() != "" && model.getImage() != null) {
                String imageName = storageService.save(model.getImage());
                model.setImage(imageName);
            }
            var mappedCategory = modelMapper.map(model, CategoryEntity.class);
            categoryRepository.save(mappedCategory);
            var result = new ResponseDTO(true, null, "Success");
            return new ResponseEntity(result, HttpStatus.OK);
        } catch (Exception ex) {
            var result = new ResponseDTO(false, null, ex.getMessage());
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<ResponseDTO> GetById(@PathVariable("id") int id) {
        var category = categoryRepository.findById(id).get();
        if(category == null) {
            var result = new ResponseDTO(true, null, "There is no category with this id");
            return new ResponseEntity(result, HttpStatus.OK);
        }
        var mappedCategory = modelMapper.map(category, CategoryDTO.class);
        var result = new ResponseDTO(true, category, "Success");
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ResponseDTO> Delete(@PathVariable int id) {
        var category = categoryRepository.findById(id).get();
        if(category == null) {
            var result = new ResponseDTO(true, null, "There is no category with this id");
            return new ResponseEntity(result, HttpStatus.OK);
        }
        storageService.delete(category.getImage());
        categoryRepository.deleteById(id);
        var result = new ResponseDTO(true, null, "Success");
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping("update")
    public ResponseEntity<ResponseDTO> Update(@RequestBody CategoryDTO model) throws Exception {
        var category = categoryRepository.findById(model.getId()).get();
        ResponseDTO result = null;
        if(category != null) {
            var newCategory = modelMapper.map(model, CategoryEntity.class);
            var modelImage = model.getImage();
            if(modelImage != null) {
                if(modelImage.startsWith("data:image")) {
                    storageService.delete(category.getImage());
                    String newImage = storageService.save(modelImage);
                    newCategory.setImage(newImage);
                }
                else if(modelImage == "") {
                    storageService.delete(category.getImage());
                }
            }

            categoryRepository.save(newCategory);
            result = new ResponseDTO(true, null, "Success");
            return new ResponseEntity(result, HttpStatus.OK);
        }
        result = new ResponseDTO(true, null, "There is no category with this id");
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
