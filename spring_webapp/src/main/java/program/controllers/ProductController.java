package program.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import program.dto.*;
import program.dto.product.CreateProductDTO;
import program.dto.product.UpdateProductDTO;
import program.services.classes.ProductServiceImpl;

@RestController
@AllArgsConstructor
@Validated
@RequestMapping("/api/product")
public class ProductController {
    private ProductServiceImpl productService;

    @GetMapping("getall")
    public ResponseEntity<ResponseDTO> GetAll() {
        var result = productService.GetAll();
        if(result.success)
            return new ResponseEntity<>(result, HttpStatus.OK);
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }
    @PostMapping(value = "create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseDTO> Create(@Valid @ModelAttribute CreateProductDTO model) {
        var result = productService.CreateProduct(model);
        if(result.success)
            return new ResponseEntity<>(result, HttpStatus.OK);
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }
    @GetMapping("{id}")
    public ResponseEntity<ResponseDTO> GetById(@PathVariable("id") int id) {
        var result = productService.GetById(id);
        if(result.success)
            return new ResponseEntity<>(result, HttpStatus.OK);
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ResponseDTO> Delete(@PathVariable int id) {
        var result = productService.DeleteProduct(id);
        if(result.success)
            return new ResponseEntity<>(result, HttpStatus.OK);
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("update")
    public ResponseEntity<ResponseDTO> Update(@Valid @RequestBody UpdateProductDTO model) {
        var result = productService.UpdateProduct(model);
        if(result.success)
            return new ResponseEntity<>(result, HttpStatus.OK);
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }
}
