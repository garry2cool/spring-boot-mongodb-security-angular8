package com.springangularauth.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.springangularauth.models.Products;

public interface ProductRepository extends MongoRepository<Products, String> {
	
	@Override
    void delete(Products deleted);
}