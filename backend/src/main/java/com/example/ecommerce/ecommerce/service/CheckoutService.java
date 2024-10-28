package com.example.ecommerce.ecommerce.service;

import com.example.ecommerce.ecommerce.dto.Purchase;
import com.example.ecommerce.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

}
