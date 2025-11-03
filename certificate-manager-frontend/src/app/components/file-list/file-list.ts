import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; // Import ViewChild & AfterViewInit
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

// Import our service and interface
import { FileSigningService, SignedFile } from '../../services/file-signing';

// --- Import all the NEW Angular Material Modules ---
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Import MatTableDataSource
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Import Paginator
import { MatFormFieldModule } from '@angular/material/form-field'; // For search
import { MatInputModule } from '@angular/material/input';       // For search
import { MatToolbarModule } from '@angular/material/toolbar';     // For the search toolbar
import { MatIconModule } from '@angular/material/icon';         // For search icon

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    // --- Add all new modules ---
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './file-list.html',
  styleUrls: ['./file-list.css']
})
export class FileListComponent implements OnInit, AfterViewInit {

  // Column names for the table
  displayedColumns: string[] = ['fileName', 'certificateName', 'signedAt', 'status'];
  
  // The new data source for the table
  dataSource = new MatTableDataSource<SignedFile>();

  // This links the paginator from the HTML to our code
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fileSigningService: FileSigningService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSignedFiles();
    this.setupCustomFilter();
  }

  // We need ngAfterViewInit to hook up the paginator
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadSignedFiles() {
    this.fileSigningService.getSignedFiles().subscribe({
      next: (data) => {
        // Put data into the new dataSource
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error loading signed files.', 'Close', { duration: 3000 });
      }
    });
  }

  // We need a custom filter to search nested data (certificate.certificateName)
  setupCustomFilter() {
    this.dataSource.filterPredicate = (data: SignedFile, filter: string) => {
      const searchString = filter.toLowerCase();
      
      const fileNameMatch = data.fileName.toLowerCase().includes(searchString);
      const certNameMatch = data.certificate.certificateName.toLowerCase().includes(searchString);

      return fileNameMatch || certNameMatch;
    };
  }

  // This is the new function for the search bar
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}