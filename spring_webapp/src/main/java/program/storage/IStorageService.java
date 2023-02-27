package program.storage;

import org.springframework.core.io.Resource;

public interface IStorageService {
    void init() throws Exception;
    Resource load(String fileName) throws Exception;
    String save(String base64) throws Exception;
}
