package com.example.ecommerce.ecommerce.dto;

import lombok.Data;

@Data
public class RegistrationRequest {

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

}
