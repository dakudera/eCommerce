package com.example.ecommerce.ecommerce.dao;

import com.example.ecommerce.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
