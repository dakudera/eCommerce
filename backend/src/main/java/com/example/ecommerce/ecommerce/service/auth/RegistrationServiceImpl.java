package com.example.ecommerce.ecommerce.service.auth;

import com.example.ecommerce.ecommerce.dto.RegistrationRequest;
import com.example.ecommerce.ecommerce.dto.RegistrationUserRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RegistrationServiceImpl implements RegistrationService {


    @Value("${jwt.auth.registration.url}")
    private String url;
    @Value("${jwt.auth.registration.grant_type}")
    private String grantType;
    @Value("${jwt.auth.registration.client_id}")
    private String clientId;
    @Value("${jwt.auth.registration.client_secret}")
    private String clientSecret;

    private final RestTemplate restTemplate;
    private final LoginService loginService;

    private static final ObjectMapper objectMapper;

    static {
        objectMapper = new ObjectMapper();
    }

    @Override
    public boolean registration(RegistrationRequest request) throws JsonProcessingException {
        String accessToken = getAccessToken();
        if (accessToken == null) return false;

        String filledRequest = fillRequest(request);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        // Create the request entity
        HttpEntity<String> requestEntity = new HttpEntity<>(filledRequest, headers);

        // Make the POST request
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        return responseEntity.getStatusCode() == HttpStatus.OK;
    }

    private String getAccessToken() {
        ResponseEntity<String> stringResponseEntity = loginService.loginService(grantType, clientId, clientSecret);
        String jsonString = stringResponseEntity.getBody();
        if (jsonString != null) {
            try {
                Map<String, Object> jsonMap = objectMapper.readValue(jsonString, Map.class);
                return (String) jsonMap.get("access_token");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    private String fillRequest(RegistrationRequest request) throws JsonProcessingException {
        RegistrationUserRequest userRequest = new RegistrationUserRequest();
        userRequest.setUsername(request.getUsername());
        userRequest.setFirstName(request.getFirstName());
        userRequest.setLastName(request.getLastName());
        userRequest.setEmail(request.getEmail());
        userRequest.setEmailVerified(true);
        userRequest.setEnabled(true);

        // Create and populate the credentials
        RegistrationUserRequest.Credential credential = new RegistrationUserRequest.Credential();
        credential.setTemporary(false);
        credential.setType("password");
        credential.setValue(request.getPassword());

        // Add the credential to the credentials list
        List<RegistrationUserRequest.Credential> credentials = new ArrayList<>();
        credentials.add(credential);
        userRequest.setCredentials(credentials);

        // Convert UserRequest object to JSON

        return objectMapper.writeValueAsString(userRequest);
    }
}
