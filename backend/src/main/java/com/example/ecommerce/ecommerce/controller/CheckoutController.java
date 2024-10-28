package com.example.ecommerce.ecommerce.controller;

import com.example.ecommerce.ecommerce.dto.Purchase;
import com.example.ecommerce.ecommerce.dto.PurchaseResponse;
import com.example.ecommerce.ecommerce.service.CheckoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/checkout")
@RestController
@RequiredArgsConstructor
public class CheckoutController {

    private final CheckoutService checkoutService;

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        return checkoutService.placeOrder(purchase);
    }

}
