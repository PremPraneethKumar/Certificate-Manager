import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

// --- Import Material Modules for the Toolbar ---
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

// --- ADD THESE NEW MODULES ---
import { MatSidenavModule } from '@angular/material/sidenav'; // For the sidenav container
import { MatListModule } from '@angular/material/list';       // For the nav list
import { MatIconModule } from '@angular/material/icon';       // For the icons (menu, security, etc.)

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink, 
    
    // --- Add ALL Modules here ---
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule, // Add this
    MatListModule,    // Add this
    MatIconModule     // Add this
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class AppComponent {
  title = 'certificate-manager-ui';
}