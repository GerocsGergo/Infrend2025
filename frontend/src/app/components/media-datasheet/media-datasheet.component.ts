import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaService } from '../../services/media.service';
import { MediaDTO } from '../../../../models';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

type UpdatableMediaField = 'cim' | 'beszerzes_datuma' | 'tipus';

@Component({
  selector: 'app-media-datasheet',
  imports: [NgIf, FormsModule],
  templateUrl: './media-datasheet.component.html',
  styleUrl: './media-datasheet.component.css'
})
export class MediaDatasheetComponent implements OnInit{

  activatedroute = inject(ActivatedRoute);
  router = inject(Router);
  mediaService = inject(MediaService);

  media: MediaDTO = {
      sorszam: 0,
      cim: '',
      beszerzes_datuma: new Date(),
      tipus: '',
      statusz: ''
    };
  
    sorszam: number = 0;
  
    showUpdatePopup = false;
    fieldToUpdate: string = '';
    newValue: string = '';
  
    errorMessage: string = '';
    errorMessageDelete: string = '';
    successMessage: string = '';

    ngOnInit() {
      this.sorszam = Number(this.activatedroute.snapshot.paramMap.get('sorszam'));
  
      this.mediaService.openMedia(this.sorszam).subscribe({
        next: (media) =>this.media = media,
        error: (err) => {
          console.error('Failed to load media:', err);
          this.errorMessage = err.error.message;
        }
      });
    }

    openBackMenu(){
      this.router.navigate(['list-all-media']);
    }

    openUpdatePopup(field: UpdatableMediaField) {
      this.fieldToUpdate = field;
      const datum = new Date(this.media.beszerzes_datuma);

      if (field === 'beszerzes_datuma') {
        this.newValue = this.media.beszerzes_datuma ? datum.toISOString().substring(0, 10) : '';
      } else {
        this.newValue = this.media[field] as string;
      }

      this.showUpdatePopup = true;
    }
  
    closeUpdatePopup() {
      this.showUpdatePopup = false;
      this.fieldToUpdate = '';
      this.newValue = '';
    }

    updateCustomer() {
      const updatePayload: any = {};
      updatePayload[this.fieldToUpdate] = this.newValue;
  
      this.mediaService.modifyMedia(
        this.sorszam,
        updatePayload.cim,
        updatePayload.beszerzes_datuma,
        updatePayload.tipus,
      ).subscribe({
        next: (response: any) => {
          console.log(response);
          this.media = { ...this.media, ...updatePayload };
          this.closeUpdatePopup();
          this.errorMessage = '';
          this.successMessage = response.message;
        },
        error: (err) => {
          console.error('Failed to update media:', err);
          this.errorMessage = err.error.message;
        }
      });
    }
  
  
    //ez azert kell h szepen irja ki
    getFormattedField(field: string): string {
      switch(field) {
        case 'cim':
          return `Cím:`;
        case 'beszerzes_datuma':
          return `Beszerzés dátuma`;
        case 'tipus':
          return `Típus`;
        default:
          return '';
      }
    }

    deleteMedia(){
      this.mediaService.deleteMedia(this.sorszam).subscribe({
        next: (response) => {
          console.log(response)
          this.media.statusz = 'selejtezett';
        },
        error: (err) => {
          console.error('Failed to delete media:', err);
          this.errorMessageDelete = err.error.message;
        }
      });
    }

    
    


}
