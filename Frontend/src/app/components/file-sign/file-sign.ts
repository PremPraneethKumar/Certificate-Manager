import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import our two services
import { CertificateService, Certificate } from '../../services/certificate';
import { FileSigningService, SigningRequest } from '../../services/file-signing';

// Import Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // For the dropdown

@Component({
  selector: 'app-file-sign',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule, // Add this
    MatSnackBarModule
  ],
  templateUrl: './file-sign.html',
  styleUrls: ['./file-sign.css']
})
export class FileSignComponent implements OnInit {

  // Form model
  model: any = {};
  
  // Array to hold the list of certificates for the dropdown
  certificates: Certificate[] = [];

  constructor(
    private certificateService: CertificateService,
    private fileSigningService: FileSigningService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    // When the page loads, fetch all certificates to populate the dropdown
    this.loadCertificates();
  }

  loadCertificates() {
    this.certificateService.getCertificates().subscribe({
      next: (data) => {
        this.certificates = data;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error loading certificates for dropdown.', 'Close', { duration: 3000 });
      }
    });
  }

  onSubmit() {
    const request: SigningRequest = {
      fileName: this.model.fileName,
      certificateId: this.model.certificateId
    };

    this.fileSigningService.signFile(request).subscribe({
      next: (response) => {
        this.snackBar.open('File signed successfully!', 'Close', { duration: 2000 });
        // Navigate to the list of signed files
        this.router.navigate(['/signed-files']);
      },
      error: (err) => {
        console.error(err);
        // Display the specific error message from the backend (e.g., "Certificate not active")
        const errorMessage = err.error || 'Error signing file. Certificate may not be active.';
        this.snackBar.open(errorMessage, 'Close', { duration: 4000 });
      }
    });
  }
}