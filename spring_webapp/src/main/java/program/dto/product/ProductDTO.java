package program.dto.product;

import lombok.Data;
import program.dto.category.CategoryDTO;
import program.entities.CategoryEntity;

import java.util.Date;
import java.util.List;

@Data
public class ProductDTO {

    private int id;

    private String name;
    private double price;

    private String description;

    private Date dateCreated;

    private CategoryDTO category;

    private List<ProductImageDTO> productImages;
}
