package com.example.certificatemanager.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;


@Document(collection = "certificates")
public class Certificate {

    @Id
    private String id;

    private String certificateName;
    private String issuerName;
    private LocalDate validFrom;
    private LocalDate validTo;

    public String getId() {
        return id;
    }

    public String getCertificateName() {
        return certificateName;
    }

    public String getIssuerName() {
        return issuerName;
    }

    public LocalDate getValidFrom() {
        return validFrom;
    }

    public LocalDate getValidTo() {
        return validTo;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setCertificateName(String certificateName) {
        this.certificateName = certificateName;
    }

    public void setIssuerName(String issuerName) {
        this.issuerName = issuerName;
    }

    public void setValidFrom(LocalDate validFrom) {
        this.validFrom = validFrom;
    }

    public void setValidTo(LocalDate validTo) {
        this.validTo = validTo;
    }
// The 'status' field and the constructor setting it are now GONE.
}