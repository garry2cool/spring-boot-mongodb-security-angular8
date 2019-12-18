package com.springangularauth.controllers;

import static org.springframework.http.ResponseEntity.ok;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.springangularauth.models.Products;
import com.springangularauth.repositories.ProductRepository;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RestController
public class ProductController {

	@Autowired
    ProductRepository productRepository;

    @RequestMapping(method = RequestMethod.GET, value = "/products")
    public Iterable<Products> product() {
        return productRepository.findAll();
    }
    
	@PostMapping("/products")
	public Products saveProduct(@RequestBody Products product) {
		return productRepository.save(product);
	}
    
    @SuppressWarnings("rawtypes")
   	@DeleteMapping("/products/{id}")
   	public ResponseEntity saveProduct(@PathVariable String id) {
   		Map<Object, Object> model = new HashMap<>();
   		Optional<Products> prod = productRepository.findById(id);
   		if(prod.isPresent()) {
   			productRepository.delete(prod.get());
   			model.put("message", "Product added successfully");
   		} else {
   			model.put("message", "Product not deleted");
   		}
   		return ok(model);
   	}
}