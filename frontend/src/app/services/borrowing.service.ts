import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BorrowingDTO, CustomerDTO } from '../../../models';

@Injectable({ 
    providedIn: 'root' 
})

export class BorrowingService {
  http = inject(HttpClient);

    getCustomerBorrowings(azonosito: number){
      return this.http.get<BorrowingDTO[]>('/api/getCustomerBorrowings/' + azonosito);
    }


    findCustomerToBorrowing(azonosito?: number) {
      let params = new HttpParams();
  
      if (azonosito !== undefined) {
        params = params.set('azonosito', azonosito);
      }
  
      return this.http.get<CustomerDTO | CustomerDTO[]>('/api/findCustomerToBorrowing', { params });
    }    

    createBorrowing(sorszam: string, azonosito: string, kolcsonzes_datuma: string) {
      const body: any = {};
      if (sorszam !== undefined) body.sorszam = Number(sorszam);
      if (azonosito !== undefined) body.azonosito = Number(azonosito);
      if (kolcsonzes_datuma !== undefined) body.kolcsonzes_datuma = kolcsonzes_datuma;
    
      return this.http.post('/api/createBorrowing/', body);
    }
    


}