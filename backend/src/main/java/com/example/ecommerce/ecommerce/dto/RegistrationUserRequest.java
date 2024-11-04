package com.example.ecommerce.ecommerce.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class RegistrationUserRequest {

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    @JsonProperty("emailVerified")
    private boolean emailVerified;
    private boolean enabled;
    private List<Credential> credentials;

    @Data
    public static class Credential {
        private boolean temporary;
        private String type;
        private String value;
    }
}
