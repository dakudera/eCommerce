package com.example.ecommerce.ecommerce.dao;

import com.example.ecommerce.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findAllByCategoryId(Long id, Pageable pageable);

    Page<Product> findByNameContaining(String name, Pageable pageable);

}
