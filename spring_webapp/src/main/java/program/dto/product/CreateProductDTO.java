package program.dto.product;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class CreateProductDTO {
    private int category_id;
    private String name;
    private double price;
    private String description;
    private List<MultipartFile> productImages;
}
