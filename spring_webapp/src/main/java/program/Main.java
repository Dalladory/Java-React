package program;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import program.mapper.ProductMapper;
import program.storage.StorageService;


@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello string boot");
        SpringApplication.run(Main.class, args);
    }
    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }

    @Bean
    public CommandLineRunner init(StorageService storageService) {
        return (args) -> {
            try {
                storageService.init();
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
            }
        };
    }
}
