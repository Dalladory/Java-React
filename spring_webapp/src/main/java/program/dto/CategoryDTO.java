package program.dto;

import lombok.Data;
import lombok.ToString;

@Data
public class CategoryDTO {
    private int id;
    private String  name;
    private String image;
    private String description;
    public CategoryDTO(){}
    public CategoryDTO(String name){
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }

}
