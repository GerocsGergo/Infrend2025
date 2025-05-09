import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BorrowingService } from '../../services/borrowing.service';
import { MediaService } from '../../services/media.service';
import { MediaDTO } from '../../../../models';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-media-datasheet-to-delete-borrowing',
  imports: [NgIf, FormsModule],
  templateUrl: './media-datasheet-to-delete-borrowing.component.html',
  styleUrl: './media-datasheet-to-delete-borrowing.component.css'
})
export class MediaDatasheetToDeleteBorrowingComponent implements OnInit{

    activatedroute = inject(ActivatedRoute);
    router = inject(Router);
    borrowingService = inject(BorrowingService);
    mediaService = inject(MediaService);

    media: MediaDTO = {
      sorszam: 0,
      cim: '',
      beszerzes_datuma: new Date(),
      tipus: '',
      statusz: ''
    };
  
    sorszam: number = 0;
  
    errorMessage: string = '';
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
      this.router.navigate(['find-media-to-delete-borrowing', this.sorszam]);
    }

    deleteBorrowing() {
      this.borrowingService.deleteBorrowing(this.sorszam).subscribe({
        next: (response) => {
          this.successMessage = response.message;
          this.media = response.media;
        },
        error: (err) => {
          console.error('Failed to delete borrowing:', err);
          this.errorMessage = err.error.message;
        }
      });
    }
    
}
