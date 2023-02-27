package program.controllers;

import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.dto.ResponseDTO;
import program.dto.UploadImageDto;
import program.storage.StorageService;

@RestController
@AllArgsConstructor
@RequestMapping("/api/image")
public class ImageController {
    private final StorageService storageService;

    @PostMapping("upload")
    public ResponseDTO Upload(@RequestBody UploadImageDto model) {
        try{
            var imageName = storageService.save(model.getBase64());
            return new ResponseDTO(true, imageName,null);
        }
        catch(Exception ex) {
            return new ResponseDTO(false, null, ex.getMessage());
        }
    }

    @ResponseBody
    @GetMapping("/{imageName:.+}")
    public ResponseEntity<Resource> GetImage(@PathVariable String imageName) {
        try {
            var result = storageService.load(imageName);
            var filename = result.getFilename();
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_GIF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "filename=\""+filename+"\"")
                    .body(result);
        } catch (Exception ex) {
            return null;
        }
    }
}
