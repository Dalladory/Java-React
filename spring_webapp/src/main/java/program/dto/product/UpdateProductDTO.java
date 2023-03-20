package program.dto.product;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import program.entities.ProductImageEntity;

import java.util.ArrayList;
import java.util.List;

@Data
public class UpdateProductDTO {
    private int id;
    private int category_id;
    private String name;
    private double price;
    private String description;
    private List<MultipartFile> newImages = new ArrayList<>();;
    private List<String> imagesToDelete = new ArrayList<>();
}
