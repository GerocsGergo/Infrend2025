import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { TestMenuComponent } from './components/test-menu/test-menu.component';

export const routes: Routes = [
    { path: '', component: WelcomeComponent },

    { path: 'main-menu', component: MainMenuComponent },

    { path: 'test-menu', component: TestMenuComponent }

];
