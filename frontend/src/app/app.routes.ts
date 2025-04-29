import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { TestMenuComponent } from './components/test-menu/test-menu.component';
import { ListAllCostumerComponent} from './components/list-all-costumer/list-all-costumer.component';
import { FindCostumerComponent } from './components/find-costumer/find-costumer.component';
import { ModifyCostumerComponent } from './components/modify-costumer/modify-costumer.component';
import { DeleteCostumerComponent } from './components/delete-costumer/delete-costumer.component';


export const routes: Routes = [
    { path: '', component: WelcomeComponent },

    { path: 'main-menu', component: MainMenuComponent },

    { path: 'test-menu', component: TestMenuComponent },

    { path: 'list-all-costumer', component: ListAllCostumerComponent },

    { path: 'find-costumer', component: FindCostumerComponent },

    { path: 'modify-costumer', component: ModifyCostumerComponent },

    { path: 'delete-costumer', component: DeleteCostumerComponent }

];
