package program.storage;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
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
        UUID uuid = UUID.randomUUID();
        String [] charArray = base64.split(","); //розділяємо код картинки на дві частини, відділяємо розширення
        String extension;
        System.out.println("-----------------"+ charArray[0]);
        switch (charArray[0]) {//check image's extension
            case "data:image/png;base64":
                extension = "png";
                break;
            default://should write cases for more images types
                extension = "jpg";
                break;
        }
        String randomFileName = uuid.toString()+"."+extension; //робимо ім'я файліка: унікальне ім'я + розширення
        java.util.Base64.Decoder decoder = Base64.getDecoder(); //створюємо екземпляр декодера
        byte[] bytes = new byte[0]; // створюємо массив байтів
        bytes = decoder.decode(charArray[1]); // декодуємо Base64 до вайтів
        int [] imageSize = {32, 150, 300, 600, 1200}; // масив розмірів фотографій
        try (var byteStream = new ByteArrayInputStream(bytes)) {
            var image = ImageIO.read(byteStream);
            for(int size : imageSize){ // в циклі створюємо фотки кожного розміру
                String directory= rootLocation.toString() +"/"+size+"_"+randomFileName; //створюємо папку де фотка буде зберігатися

                //створюємо буфер для нової фотографії, де важливо вказуємо розширення яке буде у фотки та розмір (32х32, 150х150)
                //по типу оперативна пам'ять
                BufferedImage newImg = ImageUtils.resizeImage(image,
                        extension=="jpg"? ImageUtils.IMAGE_JPEG : ImageUtils.IMAGE_PNG, size,size);
                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(); //створюємо Stream
                //фото записуємо у потік для отримання масиву байтів
                ImageIO.write(newImg, extension, byteArrayOutputStream); //за допомогою цього Stream записуємо в буфер фотографію згідно з розширенням
                byte [] newBytes = byteArrayOutputStream.toByteArray(); //з цього Stream знову отримуємо байти
                FileOutputStream out = new FileOutputStream(directory);
                out.write(newBytes); //байти зберігаємо у фійлову систему на сервері
                out.close();
            }
        }

        return randomFileName;
    } catch (IOException e) {
        throw new Exception("Проблема перетворення та збереження base64", e);
    }
}

    @Override
    public void delete(String fileName) {
        int [] imageSize = {32, 150, 300, 600, 1200};
        for (int size : imageSize) {
            Path filePath = rootLocation.resolve(size+"_"+fileName);
            File file = new File(filePath.toString());
            if (file.delete()) {
                System.out.println(fileName + " Файл видалено.");
            } else System.out.println(fileName + " Файл не знайдено.");
        }
    }
}
