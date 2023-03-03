package program.dto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomResponseEntityExceptionHandler {
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseDTO> handle(MethodArgumentNotValidException exception) {

        String errorMessage = exception.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        ResponseDTO result = new ResponseDTO(false,null, errorMessage);
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }
}