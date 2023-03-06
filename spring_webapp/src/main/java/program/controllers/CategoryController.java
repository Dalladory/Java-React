package program.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import program.dto.CategoryDTO;
import program.dto.ResponseDTO;
import program.services.classes.CategoryServiceImpl;

@Validated
@ControllerAdvice
@RestController
@AllArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {
    private CategoryServiceImpl categoryService;

    @GetMapping("getall")
    public ResponseEntity<ResponseDTO> index() {
        var result = categoryService.GetAll();
        if(result.success)
            return new ResponseEntity<>(result, HttpStatus.OK);
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("create")
    public ResponseEntity<ResponseDTO> Create(@Valid @RequestBody  CategoryDTO model) {
        var result = categoryService.CreateCategory(model);
        if(result.success)
            return new ResponseEntity<>(result, HttpStatus.OK);
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("{id}")
    public ResponseEntity<ResponseDTO> GetById(@PathVariable("id") int id) {
        var result = categoryService.GetById(id);
        if(result.success)
            return new ResponseEntity<>(result, HttpStatus.OK);
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ResponseDTO> Delete(@PathVariable int id) {
        var result = categoryService.DeleteCategory(id);
        if(result.success)
            return new ResponseEntity<>(result, HttpStatus.OK);
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("update")
    public ResponseEntity<ResponseDTO> Update(@Valid @RequestBody CategoryDTO model) {
        var result = categoryService.UpdateCategory(model);
        if(result.success)
            return new ResponseEntity<>(result, HttpStatus.OK);
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }
}
