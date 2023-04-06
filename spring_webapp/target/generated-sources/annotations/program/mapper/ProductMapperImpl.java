package program.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import program.dto.product.UpdateProductDTO;
import program.entities.ProductEntity;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-06T21:21:28+0300",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 19.0.2 (Oracle Corporation)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductEntity UpdateProductToEntity(UpdateProductDTO model) {
        if ( model == null ) {
            return null;
        }

        ProductEntity productEntity = new ProductEntity();

        productEntity.setId( model.getId() );
        productEntity.setName( model.getName() );
        productEntity.setPrice( model.getPrice() );
        productEntity.setDescription( model.getDescription() );

        return productEntity;
    }
}
