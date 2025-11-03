import { Component } from '@angular/core';
import { CertificateService, Certificate } from '../../services/certificate';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Import module
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule

// --- Import all the Angular Material Modules this component needs ---
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-certificate-add',
  standalone: true, // <-- It's standalone
  imports: [
    // --- Add all imports here ---
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './certificate-add.html',
  styleUrls: ['./certificate-add.css']
})
export class CertificateAddComponent {
  // --- The rest of the class logic is the SAME ---

  model: any = {};

  constructor(
    private certificateService: CertificateService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit() {
    if (new Date(this.model.validTo) <= new Date(this.model.validFrom)) {
      this.snackBar.open('"Valid To" date must be after "Valid From" date.', 'Close', {
        duration: 3000,
      });
      return;
    }

    const certificateData: Certificate = {
      certificateName: this.model.certificateName,
      issuerName: this.model.issuerName,
      validFrom: this.formatDate(this.model.validFrom),
      validTo: this.formatDate(this.model.validTo)
    };

    this.certificateService.addCertificate(certificateData).subscribe({
      next: (response) => {
        this.snackBar.open('Certificate created successfully!', 'Close', {
          duration: 2000
        });
        this.router.navigate(['/certificates']);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error creating certificate.', 'Close', {
          duration: 3000
        });
      }
    });
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}