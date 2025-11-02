import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interface for the object we send to the backend
export interface SigningRequest {
  fileName: string;
  certificateId: string;
}

// Interface for the signed file we get back
export interface SignedFile {
  id?: string;
  fileName: string;
  status: string;
  signedAt: string; // ISO date string
  certificate: { // The backend returns the nested certificate object
    id: string;
    certificateName: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class FileSigningService {

  private baseUrl = 'http://localhost:8080/api/signing';

  constructor(private http: HttpClient) { }

  /**
   * API call to "sign" a file
   */
  signFile(request: SigningRequest): Observable<SignedFile> {
    return this.http.post<SignedFile>(this.baseUrl, request);
  }

  /**
   * API call to list all signed files
   */
  getSignedFiles(): Observable<SignedFile[]> {
    return this.http.get<SignedFile[]>(this.baseUrl);
  }
}