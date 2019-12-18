package com.springangularauth.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.springangularauth.models.Role;

public interface RoleRepository extends MongoRepository<Role, String> {

	Role findByRole(String role);
}