package com.example.ecommerce.ecommerce.controller;

import com.example.ecommerce.ecommerce.dto.LoginRequest;
import com.example.ecommerce.ecommerce.dto.RegistrationRequest;
import com.example.ecommerce.ecommerce.service.auth.LoginService;
import com.example.ecommerce.ecommerce.service.auth.RegistrationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final LoginService loginService;
    private final RegistrationService registrationService;

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader
    ) {
        if (authHeader != null && authHeader.startsWith("Basic ")) {
            // Extract Base64-encoded credentials from the header
            String base64Credentials = authHeader.substring("Basic ".length());
            byte[] decodedBytes = Base64.getDecoder().decode(base64Credentials);
            String credentials = new String(decodedBytes);

            // Split into username and password
            String[] values = credentials.split(":", 2);
            if (values.length == 2) {
                String username = values[0];
                String password = values[1];

                // Construct a LoginRequest object from the Basic Auth credentials
                LoginRequest request = new LoginRequest();
                request.setUsername(username);
                request.setPassword(password);

                // Call your login service with the request object
                return loginService.login(request);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Basic Auth format");
            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing login credentials");
    }

    @PostMapping("/registration")
    public ResponseEntity registration(@RequestBody RegistrationRequest request) throws JsonProcessingException {
        registrationService.registration(request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
