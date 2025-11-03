import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define an interface for our Certificate object
// This is optional but very good practice
export interface Certificate {
  id?: string;
  certificateName: string;
  issuerName: string;
  validFrom: string; // We use string for dates to send as JSON
  validTo: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  // The URL of our Spring Boot backend
  private baseUrl = 'http://localhost:8080/api/certificates';

  constructor(private http: HttpClient) { }

  /**
   * API call to add a new certificate
   */
  addCertificate(certificate: Certificate): Observable<Certificate> {
    return this.http.post<Certificate>(this.baseUrl, certificate);
  }

  /**
   * API call to list all certificates
   */
  getCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.baseUrl);
  }
}