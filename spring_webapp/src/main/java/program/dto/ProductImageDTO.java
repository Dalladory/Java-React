package program.dto;

import jakarta.persistence.*;
import lombok.Data;
import program.entities.ProductEntity;

import java.util.Date;

@Data
public class ProductImageDTO {
    private int id;
    private String image;
    private int priority;
}
