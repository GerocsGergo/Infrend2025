import { Component, OnInit, inject } from '@angular/core';
import { VersionService } from '../../services/version.service';
import { VersionDTO } from '../../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  imports: [],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent implements OnInit{

  versionService = inject(VersionService)
  router = inject(Router);
    versionInfo: VersionDTO = {
      version: ''
    };

    
  ngOnInit() {
    this.versionService.getVersion().subscribe({
      next: (versionInfo) =>this.versionInfo = versionInfo,
      error: (err) => {
        console.error('Failed to load version:', err);
      }
    });
  }
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

  openFindCustomerToBorrowing(){
    const azonosito = 0;
    this.router.navigate(['find-customer-to-create-borrowing', azonosito]);
  }

  openFindMediaToBorrowing(){
    const sorszam = 0;
    this.router.navigate(['find-media-to-delete-borrowing', sorszam]);
  }

  openFindBorrowingsAfterDate(){
    this.router.navigate(['find-borrowing-after-date']);
  }


  }
