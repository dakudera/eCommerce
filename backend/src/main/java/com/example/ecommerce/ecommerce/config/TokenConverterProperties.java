package com.example.ecommerce.ecommerce.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Optional;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "jwt.auth.converter")
public class TokenConverterProperties {

    private String resourceId;
    private String principalAttribute;

    public Optional<String> getPrincipalAttribute() {
        return Optional.ofNullable(principalAttribute);
    }

}
