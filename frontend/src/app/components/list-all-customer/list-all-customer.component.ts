import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerDTO } from '../../../../models';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-list-all-customer',
  imports: [],
  templateUrl: './list-all-customer.component.html',
  styleUrl: './list-all-customer.component.css'
})
export class ListAllCustomerComponent implements OnInit{

    customerService = inject(CustomerService);

  router = inject(Router);
  customers: CustomerDTO[] = [];

  ngOnInit(): void { 
    this.customerService.getAllCustomer().subscribe({
      next: (customers) => this.customers = customers,
      error: (err) => {
        console.error('Failed to load customers', err)
      }
      
    });
  }

  openMainMenu(){
    this.router.navigate(['main-menu']);
  }

  openCustomerProfile(azonosito: number){
    this.router.navigate(['customer-datasheet', azonosito]);
  }
}
