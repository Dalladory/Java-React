package program.services.interfaces;

import program.dto.*;
import program.dto.product.CreateProductDTO;
import program.dto.product.UpdateProductDTO;

public interface ProductService {
    ResponseDTO GetAll();
    ResponseDTO GetById(int id);
    ResponseDTO CreateProduct(CreateProductDTO model);
    ResponseDTO UpdateProduct(UpdateProductDTO model);
    ResponseDTO DeleteProduct(int id);
}
