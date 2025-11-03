package com.example.certificatemanager.dto;

import com.example.certificatemanager.model.Certificate;
import com.example.certificatemanager.model.CertificateStatus;
import lombok.Data;
import java.time.LocalDate;

@Data
public class CertificateResponseDTO {

    private String id;
    private String certificateName;
    private String issuerName;
    private LocalDate validFrom;
    private LocalDate validTo;
    private CertificateStatus status; // The new calculated status field

    // This constructor does all the logic
    public CertificateResponseDTO(Certificate certificate) {
        this.id = certificate.getId();
        this.certificateName = certificate.getCertificateName();
        this.issuerName = certificate.getIssuerName();
        this.validFrom = certificate.getValidFrom();
        this.validTo = certificate.getValidTo();

        // This is the core logic you wanted:
        this.status = calculateStatus(certificate.getValidFrom(), certificate.getValidTo());
    }

    private CertificateStatus calculateStatus(LocalDate validFrom, LocalDate validTo) {
        LocalDate today = LocalDate.now();

        // Check if today is "between" the from and to dates (inclusive)
        if (!today.isBefore(validFrom) && !today.isAfter(validTo)) {
            return CertificateStatus.ACTIVE;
        } else {
            return CertificateStatus.EXPIRED;
        }
    }
}