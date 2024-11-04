package com.example.ecommerce.ecommerce.service.auth;

import com.example.ecommerce.ecommerce.dto.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    @Value("${jwt.auth.login.url}")
    private String url;
    @Value("${jwt.auth.login.grant_type}")
    private String grantType;
    @Value("${jwt.auth.login.client_id}")
    private String clientId;


    private final RestTemplate restTemplate;

    @Override
    public ResponseEntity<String> login(LoginRequest request) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("grant_type", grantType);
        formData.add("client_id", clientId);
        formData.add("username", request.getUsername());
        formData.add("password", request.getPassword());

        return request(formData);
    }

    public ResponseEntity<String> loginService(String regGrantType, String regClientId, String regClientSecret) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("grant_type", regGrantType);
        formData.add("client_id", regClientId);
        formData.add("client_secret", regClientSecret);
        return request(formData);
    }

    private ResponseEntity<String> request(MultiValueMap<String, String> formData) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(formData, headers);
        return restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
    }

}
