package program.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface IStorageService {
    void init() throws Exception;
    Resource load(String fileName) throws Exception;
    String save(String base64) throws Exception;
    String save(MultipartFile file) throws Exception;
    void delete(String fileName) throws Exception;
}
