package com.example.certificatemanager.controller;

import com.example.certificatemanager.dto.SigningRequest;
import com.example.certificatemanager.model.Certificate;
import com.example.certificatemanager.model.SignedFile;
import com.example.certificatemanager.repository.CertificateRepository;
import com.example.certificatemanager.repository.SignedFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate; // <-- Import LocalDate
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/signing")
@CrossOrigin(origins = "*")
public class FileSigningController {

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private SignedFileRepository signedFileRepository;

    @PostMapping
    public ResponseEntity<?> signFile(@RequestBody SigningRequest request) {

        // Step 1: Find the certificate by ID only
        Optional<Certificate> optionalCertificate = certificateRepository.findById(request.getCertificateId());

        if (optionalCertificate.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Certificate not found. File cannot be signed.");
        }

        Certificate certificate = optionalCertificate.get();
        LocalDate today = LocalDate.now();

        // Step 2: Manually check if the certificate is active based on its dates
        boolean isActive = !today.isBefore(certificate.getValidFrom()) &&
                !today.isAfter(certificate.getValidTo());

        if (!isActive) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Certificate is expired or not yet valid. File cannot be signed.");
        }

        // Step 3: If certificate is valid, "sign" the file
        SignedFile signedFile = new SignedFile();
        signedFile.setFileName(request.getFileName());
        signedFile.setCertificate(certificate);

        SignedFile savedFile = signedFileRepository.save(signedFile);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFile);
    }

    @GetMapping
    public ResponseEntity<List<SignedFile>> getAllSignedFiles() {
        List<SignedFile> files = signedFileRepository.findAll();
        return ResponseEntity.ok(files);
    }
}
