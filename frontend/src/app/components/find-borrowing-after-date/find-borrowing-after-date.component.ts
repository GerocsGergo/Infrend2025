import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BorrowingService } from '../../services/borrowing.service';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-find-borrowing-after-date',
  imports: [FormsModule, CommonModule],
  templateUrl: './find-borrowing-after-date.component.html',
  styleUrl: './find-borrowing-after-date.component.css'
})
export class FindBorrowingAfterDateComponent{
  router = inject(Router);
  borrowingService = inject(BorrowingService);
  activatedroute = inject(ActivatedRoute);

  limit = 1;

  openBorrowings(limit: number){
    this.router.navigate(['list-all-borrowings-after-date', limit]);
  }

  openMainMenu(){
    this.router.navigate(['main-menu']);
  }

}
