package com.example.certificatemanager.repository;

import com.example.certificatemanager.model.SignedFile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignedFileRepository extends MongoRepository<SignedFile, String> {
    // Spring Data MongoDB will provide all common methods
}