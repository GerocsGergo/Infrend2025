import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BorrowingDTO } from '../../../../models';
import { BorrowingService } from '../../services/borrowing.service';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-borrowing',
  imports: [NgIf, CommonModule, FormsModule],
  templateUrl: './create-borrowing.component.html',
  styleUrl: './create-borrowing.component.css'
})
export class CreateBorrowingComponent {
  borrowingService = inject(BorrowingService);
  router = inject(Router);
  activatedroute = inject(ActivatedRoute);

  borrowings: BorrowingDTO[] = [];
  azonosito: number = 0;

  sorszam: string = '';
  telefonszam: string = '';
  szemelyiszam: string = '';
  lakcim: string = '';

  nev: string = '';

  showUpdatePopup = false;
  fieldToUpdate: string = '';
  newValue: string = '';

  errorMessage: string = '';
  successMessage: string = '';


  ngOnInit(): void { 
    this.azonosito = Number(this.activatedroute.snapshot.paramMap.get('azonosito'));

    this.loadBorrowings();;

  }

  openUpdatePopup() {
    this.showUpdatePopup = true;
  }

  closeUpdatePopup() {
    this.showUpdatePopup = false;
    this.newValue = '';
    this.errorMessage = '';
  }

  addMedia() {
    if (!this.newValue) {
      this.errorMessage = 'Kérlek add meg a sorszámot!';
      return;
    }
  
    const today = new Date().toISOString().split('T')[0]; 
  
    this.borrowingService.createBorrowing(this.newValue, this.azonosito.toString(), today).subscribe({
      next: (response) => {
        this.successMessage = 'Sikeres hozzáadás!';
        this.closeUpdatePopup();
        this.loadBorrowings(); 
      },
      error: (err) => {
        console.error('Hiba a kölcsönzés létrehozásakor', err);
        this.errorMessage = err.error?.message || 'Ismeretlen hiba történt.';
      }
    });
  }

  loadBorrowings() {
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
        console.error('Failed to load borrowings', err);
        this.errorMessage = err.error.message;
      }
    });

  }

  openBackMenu(azonosito: number){
    this.router.navigate(['find-customer-to-create-borrowing', azonosito]);
  }

}
