import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BorrowingService } from '../../services/borrowing.service';
import { MediaDTO } from '../../../../models';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-find-media-to-delete-borrowing',
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './find-media-to-delete-borrowing.component.html',
  styleUrl: './find-media-to-delete-borrowing.component.css'
})
export class FindMediaToDeleteBorrowingComponent implements OnInit{
  router = inject(Router);
  borrowingService = inject(BorrowingService);
  activatedroute = inject(ActivatedRoute);

  sorszam = 0;

  isTableShowing = false;

  errorMessage: string = '';
  medias: MediaDTO[] = [];

  ngOnInit(): void { 
    this.sorszam = Number(this.activatedroute.snapshot.paramMap.get('sorszam'));
    if (this.sorszam > 0) {
      this.findMedia();
    }
  }

  findMedia() {
    if (!this.sorszam) {
      this.errorMessage = 'Nincs megadva sorszám!';
      return;
    }

    this.borrowingService.findMediaToBorrowing(this.sorszam).subscribe({
      next: (medias) => {
        if(Array.isArray(medias)){
            this.isTableShowing = true;
            this.medias = medias

        } else {
          this.medias = [medias];
          this.isTableShowing = true;
        }
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });

  }

  openMainMenu(){
    this.router.navigate(['main-menu']);
  }
  
  openMediaDatasheet(sorszam: number){
    this.router.navigate(['media-datasheet-to-delete-borrowing', sorszam]);
  }



}
