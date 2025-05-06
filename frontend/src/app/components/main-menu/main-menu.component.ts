import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  imports: [],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {

  router = inject(Router);


  //Customer
  openAllCustomer(){
    this.router.navigate(['list-all-customer']);
  }

  openFindCustomer(){
    this.router.navigate(['find-customer']);
  }

/*   openModifyCustomer(){
    this.router.navigate(['modify-customer']);
  }

  openDeleteCustomer(){
    this.router.navigate(['delete-customer']);
  } */

  openCreateCustomer(){
    this.router.navigate(['create-customer']);
  }


  //Media
  openAllMedia(){
    this.router.navigate(['list-all-media']);
  }

  openCreateMedia(){
    this.router.navigate(['create-media']);
  }


  }
