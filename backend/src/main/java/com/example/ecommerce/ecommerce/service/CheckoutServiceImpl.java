package com.example.ecommerce.ecommerce.service;

import com.example.ecommerce.ecommerce.dao.CustomerRepository;
import com.example.ecommerce.ecommerce.dto.Purchase;
import com.example.ecommerce.ecommerce.dto.PurchaseResponse;
import com.example.ecommerce.ecommerce.entity.Customer;
import com.example.ecommerce.ecommerce.entity.Order;
import com.example.ecommerce.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CheckoutServiceImpl implements CheckoutService {

    private final CustomerRepository customerRepository;

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Order order = purchase.getOrder();
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(order::add);

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();
        customer.add(order);
        customerRepository.save(customer);

        return new PurchaseResponse(generateOrderTrackingNumber());
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
