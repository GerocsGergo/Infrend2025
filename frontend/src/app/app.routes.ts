import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ListAllCustomerComponent} from './components/list-all-customer/list-all-customer.component';
import { FindCustomerComponent } from './components/find-customer/find-customer.component';
import { CustomerDatasheetComponent } from './components/customer-datasheet/customer-datasheet.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { ListAllMediaComponent } from './components/list-all-media/list-all-media.component';
import { MediaDatasheetComponent } from './components/media-datasheet/media-datasheet.component';
import { CreateMediaComponent } from './components/create-media/create-media.component';
import { CustomerAllBorrowingsComponent } from './components/customer-all-borrowings/customer-all-borrowings.component';
import { FindCustomerToCreateBorrowingComponent } from './components/find-customer-to-create-borrowing/find-customer-to-create-borrowing.component';
import { CreateBorrowingComponent } from './components/create-borrowing/create-borrowing.component';


export const routes: Routes = [
    { path: '', component: WelcomeComponent },

    { path: 'main-menu', component: MainMenuComponent },

    //Customer

    { path: 'list-all-customer', component: ListAllCustomerComponent },

    { path: 'customer-datasheet/:azonosito', component: CustomerDatasheetComponent},

    { path: 'find-customer', component: FindCustomerComponent },

    { path: 'create-customer', component: CreateCustomerComponent},

    //Media

    { path: 'list-all-media', component: ListAllMediaComponent},

    { path: 'media-datasheet/:sorszam', component: MediaDatasheetComponent},

    { path: 'create-media', component: CreateMediaComponent},

    //Borrowings

    { path: 'customer-all-borrowings/:azonosito', component: CustomerAllBorrowingsComponent},

    { path: 'find-customer-to-create-borrowing/:azonosito', component: FindCustomerToCreateBorrowingComponent},

    { path: 'create-borrowing/:azonosito', component: CreateBorrowingComponent}

];
