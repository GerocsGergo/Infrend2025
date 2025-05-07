import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BorrowingService } from '../../services/borrowing.service';
import { CustomerDTO } from '../../../../models';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-find-customer-to-create-borrowing',
  imports: [FormsModule, NgIf],
  templateUrl: './find-customer-to-create-borrowing.component.html',
  styleUrl: './find-customer-to-create-borrowing.component.css'
})
export class FindCustomerToCreateBorrowingComponent implements OnInit{

  router = inject(Router);
  borrowingService = inject(BorrowingService);
  activatedroute = inject(ActivatedRoute);

  azonosito = 0;

  isTableShowing = false;

  errorMessage: string = '';
  customers: CustomerDTO[] = [];

  ngOnInit(): void { 
    this.azonosito = Number(this.activatedroute.snapshot.paramMap.get('azonosito'));
    if (this.azonosito > 0) {
      this.findCustomer();
    }
  }

  findCustomer() {
    if (!this.azonosito) {
      this.errorMessage = 'Nincs megadva azonosító!';
      return;
    }

    this.borrowingService.findCustomerToBorrowing(this.azonosito).subscribe({
      next: (customers) => {
        if(Array.isArray(customers)){
            this.isTableShowing = true;
            this.customers = customers

        } else {
          this.customers = [customers];
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

  openCreateBorrowing(azonosito: number){
    this.router.navigate(['create-borrowing', azonosito]);
  }

}
