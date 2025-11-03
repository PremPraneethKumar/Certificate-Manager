package com.example.certificatemanager.dto;

import lombok.Data;

@Data // Creates getters and setters
public class SigningRequest {
    private String fileName;

    public String getCertificateId() {
        return certificateId;
    }

    public void setCertificateId(String certificateId) {
        this.certificateId = certificateId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    private String certificateId; // The ID of the certificate to use
}