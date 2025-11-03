import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; // Added ViewChild & AfterViewInit
import { CertificateService, Certificate } from '../../services/certificate';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Added Router & RouterLink

// --- Import all the NEW Angular Material Modules ---
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Import MatTableDataSource
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Import Paginator
import { MatFormFieldModule } from '@angular/material/form-field'; // For search
import { MatInputModule } from '@angular/material/input';       // For search
import { MatToolbarModule } from '@angular/material/toolbar';     // For the search toolbar
import { MatButtonModule } from '@angular/material/button';       // For the "Add" button
import { MatIconModule } from '@angular/material/icon';         // For search icon

@Component({
  selector: 'app-certificate-list',
  standalone: true,
  imports: [
    CommonModule, // Add RouterLink
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    // --- Add all new modules ---
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './certificate-list.html',
  styleUrls: ['./certificate-list.css']
})
export class CertificateListComponent implements OnInit, AfterViewInit {

  // The column names to display in the table
  displayedColumns: string[] = ['certificateName', 'issuerName', 'validFrom', 'validTo', 'status'];
  
  // This is the new data source for the table
  dataSource = new MatTableDataSource<Certificate>();

  // This links the paginator from the HTML to our code
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private certificateService: CertificateService,
    private snackBar: MatSnackBar,
    private router: Router // Inject router to navigate
  ) { }

  ngOnInit(): void {
    this.loadCertificates();
  }

  // We need ngAfterViewInit to hook up the paginator
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadCertificates() {
    this.certificateService.getCertificates().subscribe({
      next: (data) => {
        // Put data into the new dataSource
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error loading certificates.', 'Close', {
          duration: 3000
        });
      }
    });
  }

  // This is the new function for the search bar
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Navigate to the add page (for the button)
  navigateToAddCertificate() {
    this.router.navigate(['/certificates/add']);
  }
}