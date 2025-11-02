import { Routes } from '@angular/router';
// Import your existing components
import { CertificateListComponent } from './components/certificate-list/certificate-list';
import { CertificateAddComponent } from './components/certificate-add/certificate-add';

// --- Import your NEW components ---
import { FileSignComponent } from './components/file-sign/file-sign';
import { FileListComponent } from './components/file-list/file-list';

export const routes: Routes = [
  // Certificate routes
  { path: '', redirectTo: 'certificates', pathMatch: 'full' }, 
  { path: 'certificates', component: CertificateListComponent },
  { path: 'certificates/add', component: CertificateAddComponent },

  // --- ADD THESE NEW ROUTES ---
  { path: 'sign-file', component: FileSignComponent },
  { path: 'signed-files', component: FileListComponent }
];