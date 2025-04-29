import { Component, OnInit, inject } from '@angular/core';
import { VersionService } from '../../services/version.service';
import { VersionDTO } from '../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{


  versionService = inject(VersionService)
  router = inject(Router);
  versionInfo: VersionDTO | null = null;

  ngOnInit() {
    this.versionService.getVersion().subscribe({
      next: (versionInfo) =>this.versionInfo = versionInfo,
      error: (err) => {
        console.error('Failed to load version:', err);
      }
    });
  }

  login(){
    this.router.navigate(['main-menu']);
  }
  
}
