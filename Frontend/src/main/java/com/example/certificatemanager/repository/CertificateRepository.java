package com.example.certificatemanager.repository;

import com.example.certificatemanager.model.Certificate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

// We just need the basic repository.
// The findByIdAndStatus method is GONE.
@Repository
public interface CertificateRepository extends MongoRepository<Certificate, String> {
}