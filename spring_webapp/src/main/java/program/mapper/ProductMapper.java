package program.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import program.dto.product.UpdateProductDTO;
import program.entities.ProductEntity;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "productImages", ignore = true)
    ProductEntity UpdateProductToEntity (UpdateProductDTO model);
}
