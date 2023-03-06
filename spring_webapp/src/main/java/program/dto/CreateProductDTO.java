package program.dto;

import lombok.Data;
import program.entities.CategoryEntity;

import java.util.Date;
import java.util.List;

@Data
public class CreateProductDTO {
    private int category_id;
    private String name;
    private double price;
    private String description;
    private List<ProductImageDTO> productImages;
}
