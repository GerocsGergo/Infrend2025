import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { CustomerDTO } from '../../../../models';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-find-customer',
  imports: [FormsModule, NgIf],
  templateUrl: './find-customer.component.html',
  styleUrl: './find-customer.component.css'
})
export class FindCustomerComponent {

  router = inject(Router);
  customerService = inject(CustomerService);

  azonosito = 0;
  szemelyiszam = "";
  nev = "";

  isTableShowing = false;

  errorMessage: string = '';
  customers: CustomerDTO[] = [];

  openCustomerProfile(azonosito: number){
    const backButtonCode = 0 //0 = find-customer menu, 1 = list-all-customer menu
    console.log(backButtonCode);
    this.router.navigate(['customer-datasheet', azonosito], { queryParams: { backButtonCode } });
  }

  findCustomer() {
    if (!this.azonosito && !this.szemelyiszam && !this.nev) {
      this.errorMessage = 'Legalább egy keresési feltételt meg kell adni!';
      return;
    }

    this.customerService.findCustomers(this.azonosito, this.szemelyiszam, this.nev).subscribe({
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
}
