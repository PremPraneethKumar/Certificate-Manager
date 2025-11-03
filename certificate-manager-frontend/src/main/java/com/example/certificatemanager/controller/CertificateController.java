package com.example.certificatemanager.controller;

import com.example.certificatemanager.dto.CertificateResponseDTO; // <-- Import DTO
import com.example.certificatemanager.model.Certificate;
import com.example.certificatemanager.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors; // <-- Import Collectors

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "http://localhost:4200")
public class CertificateController {

    @Autowired
    private CertificateRepository certificateRepository;

    @PostMapping
    public ResponseEntity<?> createCertificate(@RequestBody Certificate certificate) {
        // Validation: "Valid To" date should be after "Valid From" date
        if (certificate.getValidFrom() != null && certificate.getValidTo() != null) {
            if (certificate.getValidTo().isBefore(certificate.getValidFrom())) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("\"Valid To\" date must be after \"Valid From\" date.");
            }
        }

        // No more default status setting
        Certificate savedCertificate = certificateRepository.save(certificate);

        // Return the DTO so the user sees the calculated status immediately
        return ResponseEntity.status(HttpStatus.CREATED).body(new CertificateResponseDTO(savedCertificate));
    }

    /**
     * API to list all certificates with calculated status
     */
    @GetMapping
    public ResponseEntity<List<CertificateResponseDTO>> getAllCertificates() {
        List<Certificate> certificates = certificateRepository.findAll();

        // Convert our List<Certificate> to a List<CertificateResponseDTO>
        // This dynamically calculates the status for every certificate
        List<CertificateResponseDTO> responseList = certificates.stream()
                .map(CertificateResponseDTO::new) // or .map(cert -> new CertificateResponseDTO(cert))
                .collect(Collectors.toList());

        return ResponseEntity.ok(responseList);
    }
}