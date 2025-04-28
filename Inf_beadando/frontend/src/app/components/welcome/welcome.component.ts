import { Component, OnInit } from '@angular/core';
import { VersionService } from '../../services/version.service';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{

  versionInfo: any;
  isLoading = true;

  constructor(private versionService: VersionService) {}

  ngOnInit() {
    this.versionService.getVersion().subscribe({
      next: (data) => {
        this.versionInfo = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load version:', err);
        this.isLoading = false;
      }
    });
  }
}
