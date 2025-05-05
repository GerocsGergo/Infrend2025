import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { TestMenuComponent } from './components/test-menu/test-menu.component';
import { ListAllCustomerComponent} from './components/list-all-customer/list-all-customer.component';
import { FindCustomerComponent } from './components/find-customer/find-customer.component';
import { ModifyCustomerComponent } from './components/modify-customer/modify-customer.component';
import { DeleteCustomerComponent } from './components/delete-customer/delete-customer.component';
import { CustomerDatasheetComponent } from './components/customer-datasheet/customer-datasheet.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';


export const routes: Routes = [
    { path: '', component: WelcomeComponent },

    { path: 'main-menu', component: MainMenuComponent },

    { path: 'test-menu', component: TestMenuComponent },

    { path: 'list-all-customer', component: ListAllCustomerComponent },

    { path: 'customer-datasheet/:azonosito', component: CustomerDatasheetComponent},

    { path: 'find-customer', component: FindCustomerComponent },

    { path: 'modify-customer/:azonosito', component: ModifyCustomerComponent },

    { path: 'delete-customer/:azonosito', component: DeleteCustomerComponent },

    { path: 'create-customer', component: CreateCustomerComponent}



];
