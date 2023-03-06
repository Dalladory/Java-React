package program.dto;

import jakarta.persistence.*;
import lombok.Data;
import program.entities.CategoryEntity;
import program.entities.ProductImageEntity;

import java.util.Date;
import java.util.List;

@Data
public class ProductDTO {

    private int id;

    private String name;
    private double price;

    private String description;

    private Date dateCreated;

    private CategoryEntity category;

    private List<ProductImageDTO> productImages;
}
