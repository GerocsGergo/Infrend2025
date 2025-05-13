import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerDTO } from '../../../../models';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CustomerService } from '../../services/customer.service';


type UpdatableCustomerField = 'nev' | 'telefonszam' | 'szemelyiszam' | 'lakcim';


@Component({
  selector: 'app-customer-datasheet',
  imports: [NgIf, FormsModule],
  templateUrl: './customer-datasheet.component.html',
  styleUrl: './customer-datasheet.component.css'
})
export class CustomerDatasheetComponent implements OnInit{

  activatedroute = inject(ActivatedRoute);
  router = inject(Router);
  customerService = inject(CustomerService);

  customer: CustomerDTO = {
    azonosito: 0,
    nev: '',
    telefonszam: '',
    szemelyiszam: '',
    lakcim: '',
    statusz: 'aktiv',
  };

  azonosito: number = 0;

  showUpdatePopup = false;
  fieldToUpdate: string = '';
  newValue: string = '';

  errorMessage: string = '';
  successMessage: string = '';
  
  backButtonCode: number = 99; //0 = find-customer menu, 1 = list-all-customer menu

  ngOnInit() {
    this.azonosito = Number(this.activatedroute.snapshot.paramMap.get('azonosito'));

    this.customerService.openCustomer(this.azonosito).subscribe({
      next: (customer) =>this.customer = customer,
      error: (err) => {
        console.error('Failed to load customer:', err);
        this.errorMessage = err.error.message;
      }
    });

    this.activatedroute.queryParamMap.subscribe(queryParams => {
      this.backButtonCode = Number(queryParams.get('backButtonCode'));
      console.log(this.backButtonCode);
    });
  }

  openBackMenu(){
    if (this.backButtonCode === 0) {
      this.router.navigate(['find-customer']);
    } else if (this.backButtonCode === 1) { 
      this.router.navigate(['list-all-customer']);
    }

  }

  deleteCustomer(){
    this.customerService.deleteCustomer(this.azonosito).subscribe({
      next: (response) => {
        console.log(response)
        this.customer.statusz = 'torolt';
      },
      error: (err) => {
        console.error('Failed to load customer:', err);
        this.errorMessage = err.error.message;
      }
    });
  }

  activateCustomer(){
    this.customerService.activateCustomer(this.azonosito).subscribe({
      next: (response) => {
        console.log(response)
        this.customer.statusz = 'aktiv';
      },
      error: (err) => {
        console.error('Failed to load customer:', err);
        this.errorMessage = err.error.message;
      }
    });
  }

  openUpdatePopup(field: UpdatableCustomerField) {
    this.fieldToUpdate = field;
    this.showUpdatePopup = true;
  }

  closeUpdatePopup() {
    this.showUpdatePopup = false;
    this.fieldToUpdate = '';
    this.newValue = '';
    this.errorMessage = '';
  }

  updateCustomer() {
    const updatePayload: any = {};
    updatePayload[this.fieldToUpdate] = this.newValue;

    this.customerService.modifyCustomer(
      this.azonosito,
      updatePayload.nev,
      updatePayload.telefonszam,
      updatePayload.szemelyiszam,
      updatePayload.lakcim
    ).subscribe({
      next: (response: any) => {
        console.log(response);
        this.customer = { ...this.customer, ...updatePayload };
        this.closeUpdatePopup();
        this.errorMessage = '';
        this.successMessage = response.message;
      },
      error: (err) => {
        console.error('Failed to update customer:', err);
        this.errorMessage = err.error.message;
      }
    });
  }


  //ez azert kell h szepen irja ki
  getFormattedField(field: string): string {
    switch(field) {
      case 'nev':
        return `Név:`;
      case 'telefonszam':
        return `Telefonszám`;
      case 'szemelyiszam':
        return `Személyiszám`;
      case 'lakcim':
        return `Lakcím`;
      default:
        return '';
    }
  }

  openCustomerBorrowings(azonosito: number){ 
    const backButtonCode = this.backButtonCode
    this.router.navigate(['customer-all-borrowings', azonosito], { queryParams: { backButtonCode} });
  }

}
