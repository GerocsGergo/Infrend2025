import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VersionDTO } from '../../../models';

@Injectable({ 
    providedIn: 'root' 
})


export class VersionService {
  //constructor(private http: HttpClient) {} // Standard dependency injection
  http = inject(HttpClient);

  getVersion() {
    return this.http.get<VersionDTO>('/api/version');
  }
  
}