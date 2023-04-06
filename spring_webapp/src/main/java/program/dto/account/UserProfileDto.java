package program.dto.account;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserProfileDto {
    private int id;
    private String name;
    private String surname;
    private String email;

}
