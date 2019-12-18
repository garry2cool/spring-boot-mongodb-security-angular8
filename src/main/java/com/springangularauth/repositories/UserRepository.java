package com.springangularauth.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.springangularauth.models.User;

public interface UserRepository extends MongoRepository<User, String> {

	User findByEmail(String email);
}