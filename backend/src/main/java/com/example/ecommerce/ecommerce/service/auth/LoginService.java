package com.example.ecommerce.ecommerce.service.auth;

import com.example.ecommerce.ecommerce.dto.LoginRequest;
import org.springframework.http.ResponseEntity;

public interface LoginService {

    ResponseEntity<String> login(LoginRequest request);

    ResponseEntity<String> loginService(String regGrantType, String regClientId, String regClientSecret);

}
