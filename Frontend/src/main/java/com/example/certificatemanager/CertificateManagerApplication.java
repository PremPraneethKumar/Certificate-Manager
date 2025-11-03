package com.example.certificatemanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // This one annotation enables all of Spring Boot's magic
public class CertificateManagerApplication {

    public static void main(String[] args) {
        // This line is what starts your web server
        SpringApplication.run(CertificateManagerApplication.class, args);
    }

}