package program.dto.category;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateCategoryDTO {
    @NotBlank(message = "Name is required")
    @Length(min = 3, message = "Name minimum length 3")
    private String  name;
    private MultipartFile image;
    @NotBlank(message = "Description is required")
    @Length(min = 3, message = "Description minimum length 3")
    private String description;
}
