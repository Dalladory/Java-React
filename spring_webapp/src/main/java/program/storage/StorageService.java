package program.storage;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class StorageService implements IStorageService {
    private final Path rootLocation;
    public StorageService(){
        this.rootLocation = Paths.get("uploads");
    }

    @Override
    public void init() throws Exception {
        try{
            var exists = Files.exists(rootLocation);
            if(!exists){
                Files.createDirectories(rootLocation);
            }
        } catch(Exception ex) {
            throw new Exception("Error during creating root directory: " + ex.getMessage());
        }
    }

    @Override
    public Resource load(String fileName) throws Exception {
        try {
            Path file = rootLocation.resolve(fileName);
            Resource resource = new UrlResource(file.toUri());
            if(resource.exists() || resource.isReadable()) {
                return resource;
            }
            throw new Exception("Error during reading file " + fileName);
        }
        catch (Exception e) {
            throw new Exception("Error during reading file " + fileName + ": " + e.getMessage());
        }
    }

    @Override
    public String save(String base64) throws Exception {
        try {
            if(base64.isEmpty()) {
                throw new Exception("Base64 is empty");
            }
            UUID uuid = UUID.randomUUID();
            String randomFileName = uuid.toString()+".jpg";
            String [] charArray = base64.split(",");
            Base64.Decoder decoder = Base64.getDecoder();
            byte [] bytes = new byte[0];
            bytes = decoder.decode(charArray[1]);
            String folder = rootLocation.toString()+"/"+randomFileName;
            new FileOutputStream(folder).write(bytes);
            return randomFileName;
        } catch (IOException e) {
            throw new Exception("Problem during converting and saving base64", e);
        }
    }
}
