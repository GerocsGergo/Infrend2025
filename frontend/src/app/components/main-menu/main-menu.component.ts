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

  openTest(){
    this.router.navigate(['test-menu']);
  }

  openAllCustomer(){
    this.router.navigate(['list-all-costumer']);
  }

  openFindCostumer(){
    this.router.navigate(['find-costumer']);
  }

  openModifyCostumer(){
    this.router.navigate(['modify-costumer']);
  }

  openDeleteCostumer(){
    this.router.navigate(['delete-costumer']);
  }
}
