package com.example.ecommerce.ecommerce.dto;

import com.example.ecommerce.ecommerce.entity.Address;
import com.example.ecommerce.ecommerce.entity.Customer;
import com.example.ecommerce.ecommerce.entity.Order;
import com.example.ecommerce.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address billingAddress;
    private Address shippingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
