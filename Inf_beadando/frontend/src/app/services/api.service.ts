import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({ 
    providedIn: 'root' 
})


export class ApiService {
 // private baseUrl = 'http://localhost:3306/api';  // Point to your backend
  http = inject(HttpClient);

  getVersion() {
    return this.http.get<String>('/api/version');
  }
  
}