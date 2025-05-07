import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BorrowingDTO } from '../../../models';

@Injectable({ 
    providedIn: 'root' 
})

export class BorrowingService {
  http = inject(HttpClient);

    getCustomerBorrowings(azonosito: number){
      return this.http.get<BorrowingDTO[]>('/api/getCustomerBorrowings/' + azonosito);
    }

}