package program.dto.category;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

@Data
public class CategoryDTO {
    private int id;
    @NotBlank(message = "Name is required")
    @Length(min = 3, message = "Name minimum length 3")
    private String  name;
    private String image;
    @NotBlank(message = "Description is required")
    @Length(min = 3, message = "Description minimum length 3")
    private String description;
}
