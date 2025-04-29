import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../../../models';

@Injectable({ 
    providedIn: 'root' 
})


export class TestService {
  http = inject(HttpClient);

  getOneUser(id: number) {
    return this.http.get<UserDTO>('/api/getOneUser/' + id);
  }
  
}