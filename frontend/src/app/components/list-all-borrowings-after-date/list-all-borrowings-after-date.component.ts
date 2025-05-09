import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BorrowingDTO, BorrowingLateDTO } from '../../../../models';
import { BorrowingService } from '../../services/borrowing.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-all-borrowings-after-date',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-all-borrowings-after-date.component.html',
  styleUrl: './list-all-borrowings-after-date.component.css'
})
export class ListAllBorrowingsAfterDateComponent implements OnInit {
  borrowingService = inject(BorrowingService);
  router = inject(Router);
  activatedroute = inject(ActivatedRoute);

  borrowings: BorrowingDTO[] = [];
  borrowingsDaysLate: BorrowingLateDTO[] = [];
  errorMessage = '';
  limit = 1;
  keses_napok = 0;

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      const limitParam = params.get('limit');
      this.limit = limitParam ? Number(limitParam) : 1;
      this.getLateBorrowings();
    });
  }

  getLateBorrowings() {
    this.borrowingService.getLateBorrowings(this.limit).subscribe({
      next: (data) => {
        this.borrowings = data;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Hiba történt a kölcsönzések lekérdezésekor.';
      }
    });

    this.borrowingService.getLateBorrowingsLimit(this.limit).subscribe({
      next: (borrowingsDaysLate) => this.borrowingsDaysLate = borrowingsDaysLate,
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Hiba történt a kölcsönzések lekérdezésekor.';
      }
    });

  }

  
  getDaysLate(id: number): number {
    const found = this.borrowingsDaysLate.find(item => item.id === id);
    return found ? found.daysLate : 0;
  }

  openBackMenu() {
    this.router.navigate(['main-menu']);
  }
}
