package program.services.classes;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import program.dto.*;
import program.dto.category.CategoryDTO;
import program.dto.product.CreateProductDTO;
import program.dto.product.ProductDTO;
import program.dto.product.ProductImageDTO;
import program.dto.product.UpdateProductDTO;
import program.entities.CategoryEntity;
import program.entities.ProductEntity;
import program.entities.ProductImageEntity;
import program.mapper.ProductMapper;
import program.repositories.ProductImageRepository;
import program.repositories.ProductRepository;
import program.services.interfaces.ProductService;
import program.storage.StorageService;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    private ProductImageRepository productImageRepository;
    private ModelMapper modelMapper;
    private ProductMapper productMapper;
    private StorageService storageService;
    @Override
    public ResponseDTO GetAll() {
        try{
            var products = productRepository.findAll();
            List<ProductDTO> mappedProducts = modelMapper.map(products, new TypeToken<List<ProductDTO>>(){}.getType());
            return new ResponseDTO(true, mappedProducts, "Success");
        }
        catch (Exception ex) {
            return new ResponseDTO(false, null, ex.getMessage());
        }
    }

    @Override
    public ResponseDTO GetById(int id) {
        try{
            var category = productRepository.findById(id).get();
            if(category == null) {
                return new ResponseDTO(true, null, "There is no category with this id");
            }
            var mappedCategory = modelMapper.map(category, ProductDTO.class);
            return new ResponseDTO(true, mappedCategory, "Success");
        }
        catch(Exception ex) {
            return new ResponseDTO(true, null, ex.getMessage());
        }
    }

    @Override
    public ResponseDTO CreateProduct(CreateProductDTO model) {
        try {
            var newProduct = modelMapper.map(model, ProductEntity.class);
            var category = new CategoryEntity();
            category.setId(model.getCategory_id());
            newProduct.setCategory(category);
            productRepository.save(newProduct);

            var images = model.getProductImages();
            if(images != null && images.size() > 0) {
                int priority = 1;
                for (MultipartFile img:images) {
                    var name = storageService.save(img);
                    var newImg = new ProductImageEntity();
                    newImg.setImage(name);
                    newImg.setProduct(newProduct);
                    newImg.setPriority(priority);
                    productImageRepository.save(newImg);
                    priority++;
                }
            }
            return new ResponseDTO(true, null, "Success");
        } catch (Exception ex) {
            return new ResponseDTO(false, null, ex.getMessage());
        }
    }

    @Override
    public ResponseDTO UpdateProduct(UpdateProductDTO model) {
        try {
            var product = productRepository.findById(model.getId()).get();
            if(product == null) {
                return new ResponseDTO(true, null, "There is no product with this id");
            }

            DeleteProductImagesByName(model.getImagesToDelete(), true);
            var modelImages = model.getNewImages();
            if(modelImages != null && modelImages.size() > 0) {
                int priority = product.getProductImages().size() + 1;
                for (MultipartFile img:modelImages) {
                    var name = storageService.save(img);
                    var newImg = new ProductImageEntity();
                    newImg.setImage(name);
                    newImg.setProduct(product);
                    newImg.setPriority(priority);
                    productImageRepository.save(newImg);
                    priority++;
                }
            }

            var category = new CategoryEntity();
            category.setId(model.getCategory_id());

            product = productMapper.UpdateProductToEntity(model);
            product.setCategory(category);
            productRepository.save(product);

            return new ResponseDTO(true, null, "Success");
        }
        catch (Exception ex) {
            return new ResponseDTO(false, null, ex.getMessage());
        }
    }

    @Override
    public ResponseDTO DeleteProduct(int id) {
        try{
            var product = productRepository.findById(id).get();
            if(product == null) {
                return new ResponseDTO(true, null, "There is no product with this id");
            }
            var images = product.getProductImages();
            DeleteProductImages(images, false);
            productRepository.deleteById(id);
            return new ResponseDTO(true, null, "Success");
        }
        catch (Exception ex) {
            return new ResponseDTO(false, null, ex.getMessage());
        }
    }

    private void DeleteProductImages(List<ProductImageEntity> images, boolean deleteFromBase) {
        if(images != null) {
            for (ProductImageEntity img : images
            ) {
                storageService.delete(img.getImage());
                if (deleteFromBase)
                    productImageRepository.delete(img);
            }
        }
    }
    private void DeleteProductImagesByName(List<String> images, boolean deleteFromBase) {
        if(images != null) {
            for (String img : images
            ) {
                storageService.delete(img);
                if (deleteFromBase) {
                    ProductImageEntity image = productImageRepository.findByImage(img);
                    productImageRepository.delete(image);
                }
            }
        }
    }
}
