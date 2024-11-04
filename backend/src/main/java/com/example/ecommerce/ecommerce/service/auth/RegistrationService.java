package com.example.ecommerce.ecommerce.service.auth;

import com.example.ecommerce.ecommerce.dto.RegistrationRequest;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface RegistrationService {

    boolean registration(RegistrationRequest request) throws JsonProcessingException;

}
