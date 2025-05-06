import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MediaService } from '../../services/media.service';
import { MediaDTO } from '../../../../models';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-list-all-media',
  imports: [CommonModule],
  templateUrl: './list-all-media.component.html',
  styleUrl: './list-all-media.component.css'
})
export class ListAllMediaComponent implements OnInit{

  mediaService = inject(MediaService);
  router = inject(Router);

  medias: MediaDTO[] = [];

  errorMessage: string = "";

  ngOnInit(): void { 
    this.mediaService.getAllmedia().subscribe({
      next: (medias) => this.medias = medias,
      error: (err) => {
        console.error('Failed to load medias', err)
        this.errorMessage = err.error.message;
      }
      
    });
  }

  openMainMenu(){
    this.router.navigate(['main-menu']);
  }

  openMediaDatasheet(sorszam: number){
    this.router.navigate(['media-datasheet', sorszam]);
  }
} 
