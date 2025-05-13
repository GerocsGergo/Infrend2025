import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BorrowingDTO } from '../../../../models';
import { BorrowingService } from '../../services/borrowing.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-all-borrowings',
  imports: [CommonModule],
  templateUrl: './customer-all-borrowings.component.html',
  styleUrl: './customer-all-borrowings.component.css'
})
export class CustomerAllBorrowingsComponent implements OnInit{

  borrowingService = inject(BorrowingService);
  router = inject(Router);
  activatedroute = inject(ActivatedRoute);

  borrowings: BorrowingDTO[] = [];
  azonosito: number = 0;
  nev: string = '';

  errorMessage: string = "";

  backButtonCode: number = 99; //0 = find-customer menu, 1 = list-all-customer menu

  ngOnInit(): void { 
    this.azonosito = Number(this.activatedroute.snapshot.paramMap.get('azonosito'));

    this.borrowingService.getCustomerBorrowings(this.azonosito).subscribe({
      next: (borrowings) => {
        this.borrowings = borrowings
        if (this.borrowings.length > 0) {
          this.nev = this.borrowings[0].customer.nev;
        } else {
          this.nev = 'Ismeretlen ügyfél';
        }
      },
      error: (err) => {
        console.error('Failed to load borrowings', err)
        this.errorMessage = err.error.message;
      }
      
    });

    this.activatedroute.queryParamMap.subscribe(queryParams => {
      this.backButtonCode = Number(queryParams.get('backButtonCode'));
      console.log(this.backButtonCode);
    });
  }

  openBackMenu(azonosito: number){
    const backButtonCode = this.backButtonCode
    this.router.navigate(['customer-datasheet', azonosito], { queryParams: { backButtonCode } });
  }
}
