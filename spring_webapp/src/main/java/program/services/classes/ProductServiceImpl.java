package program.services.classes;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import program.dto.*;
import program.entities.CategoryEntity;
import program.entities.ProductEntity;
import program.entities.ProductImageEntity;
import program.repositories.ProductImageRepository;
import program.repositories.ProductRepository;
import program.services.interfaces.ProductService;
import program.storage.StorageService;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    private ProductImageRepository productImageRepository;
    private ModelMapper modelMapper;
    private StorageService storageService;
    @Override
    public ResponseDTO GetAll() {
        try{
            var products = productRepository.findAll();
            var mappedProducts = modelMapper.map(products, new TypeToken<ProductDTO>(){}.getType());
            return new ResponseDTO(true, products, "Success");
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
                for (ProductImageDTO img:images) {
                    if(img.getImage().startsWith("data:image")) {
                        var result = storageService.save(img.getImage());
                        var newImg = modelMapper.map(img, ProductImageEntity.class);
                        newImg.setImage(result);
                        newImg.setProduct(newProduct);
                        productImageRepository.save(newImg);
                    }
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

            var modelImages = model.getProductImages();
            if(modelImages == null || modelImages.size() == 0) {
                DeleteProductImages(product.getProductImages());
            }else {
                for (ProductImageDTO img:modelImages
                ) {
                    if(img.getImage().startsWith("data:image")){
                        ProductImageEntity newImg = new ProductImageEntity();
                        var isImageExistsInBase = productImageRepository.existsById(img.getId());
                        if(isImageExistsInBase) {
                            newImg = productImageRepository.getById(img.getId());
                            var oldImgName = newImg.getImage();
                            if(oldImgName != null && oldImgName != "") {
                                storageService.delete(newImg.getImage());
                            }
                        }
                        var result = storageService.save(img.getImage());
                        newImg.setImage(result);
                        newImg.setPriority(img.getPriority());
                        productImageRepository.save(newImg);
                    }
                }
            }
            var category = new CategoryEntity();
            category.setId(model.getCategory_id());
            var newProduct = modelMapper.map(model, ProductEntity.class);
            newProduct.setCategory(category);

            productRepository.save(newProduct);
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
            if(images.size() > 0) {
                for (ProductImageEntity img:images
                     ) {
                    storageService.delete(img.getImage());
                }
            }
            productRepository.deleteById(id);
            return new ResponseDTO(true, null, "Success");
        }
        catch (Exception ex) {
            return new ResponseDTO(false, null, ex.getMessage());
        }
    }

    private void DeleteProductImages(List<ProductImageEntity> images) {
        for (ProductImageEntity img:images
             ) {
            storageService.delete(img.getImage());
            productImageRepository.delete(img);
        }
    }
}
