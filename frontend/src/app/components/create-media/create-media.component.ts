import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-create-media',
  imports: [FormsModule, NgIf],
  templateUrl: './create-media.component.html',
  styleUrl: './create-media.component.css'
})
export class CreateMediaComponent {

    router = inject(Router);
    mediaService = inject(MediaService);
  
    cim: string = '';
    tipus: string = '';
    beszerzes_datuma: string = '';
  
    errorMessage: string = '';
    successMessage: string = '';

    createMedia() {
      this.mediaService.createMedia(
        this.cim,
        this.tipus,
        this.beszerzes_datuma,
      ).subscribe({
        next: (response: any) => {
          console.log(response);
          this.successMessage = response.message;
          this.errorMessage = '';
  
          this.cim = '';
          this.tipus = '';
          this.beszerzes_datuma = '';
        },
        error: (err) => {
          console.error('Hiba a létrehozásban', err);
          this.errorMessage = err.error.message;
          this.successMessage = '';
        }
      });
    }

  openMainMenu(){
    this.router.navigate(['main-menu']);
  }
}
