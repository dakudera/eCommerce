package com.example.ecommerce.ecommerce.config;

import com.example.ecommerce.ecommerce.entity.Country;
import com.example.ecommerce.ecommerce.entity.Product;
import com.example.ecommerce.ecommerce.entity.ProductCategory;
import com.example.ecommerce.ecommerce.entity.State;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.ExposureConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class RestConfig implements RepositoryRestConfigurer {

    private final EntityManager entityManager;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH};

        // disable HTTP methods for Product: PUT, POST, DELETE and PATCH
        disableHttpMethod(config.getExposureConfiguration()
                .forDomainType(Product.class), unsupportedActions);

        // disable HTTP methods for ProductCategory: PUT, POST, DELETE and PATCH
        disableHttpMethod(config.getExposureConfiguration()
                .forDomainType(ProductCategory.class), unsupportedActions);
        disableHttpMethod(config.getExposureConfiguration()
                .forDomainType(Country.class), unsupportedActions);
        disableHttpMethod(config.getExposureConfiguration()
                .forDomainType(State.class), unsupportedActions);
        exposeIds(config);
    }

    private static void disableHttpMethod(ExposureConfigurer config, HttpMethod[] unsupportedActions) {
        config
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        List<Class> entityClasses = new ArrayList<>();

        entities.forEach(e -> entityClasses.add(e.getJavaType()));

        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
