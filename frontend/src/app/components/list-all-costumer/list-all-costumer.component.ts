import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-all-costumer',
  imports: [],
  templateUrl: './list-all-costumer.component.html',
  styleUrl: './list-all-costumer.component.css'
})
export class ListAllCostumerComponent {

  router = inject(Router);

  openMainMenu(){
    this.router.navigate(['main-menu']);
  }
}
