package program.dto;

public class ResponseDTO {
    public boolean success = false;
    public Object payload;
    public Object message;
    public  ResponseDTO(boolean success, Object payload, Object message) {
        this.success = success;
        this.payload = payload;
        this.message = message;
    }

    public ResponseDTO(){}
}
