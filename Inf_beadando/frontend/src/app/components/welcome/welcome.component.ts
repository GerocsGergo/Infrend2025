import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  appVersion = environment.version;
}
