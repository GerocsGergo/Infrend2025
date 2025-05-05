import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-create-customer',
  imports: [FormsModule, NgIf],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent{

  router = inject(Router);
  customerService = inject(CustomerService);

  nev: string = '';
  telefonszam: string = '';
  szemelyiszam: string = '';
  lakcim: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  openMainMenu(){
    this.router.navigate(['main-menu']);
  }

  createCustomer() {
    this.customerService.createCustomer(
      this.nev,
      this.telefonszam,
      this.szemelyiszam,
      this.lakcim
    ).subscribe({
      next: (response: any) => {
        console.log(response);
        this.successMessage = response.message;
        this.errorMessage = '';

        this.nev = '';
        this.telefonszam = '';
        this.szemelyiszam = '';
        this.lakcim = '';
      },
      error: (err) => {
        console.error('Hiba a létrehozásban', err);
        this.errorMessage = err.error.message;
        this.successMessage = '';
      }
    });
  }
}
