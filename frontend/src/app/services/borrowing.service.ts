import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BorrowingDTO, CustomerDTO, MediaDTO } from '../../../models';

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
    
    findMediaToBorrowing(sorszam?: number) {
      let params = new HttpParams();
  
      if (sorszam !== undefined) {
        params = params.set('sorszam', sorszam);
      }
  
      return this.http.get<MediaDTO | MediaDTO[]>('/api/findMediaToBorrowing', { params });
    }  

    createBorrowing(sorszam: string, azonosito: string, kolcsonzes_datuma: string) {
      const body: any = {};
      if (sorszam !== undefined) body.sorszam = Number(sorszam);
      if (azonosito !== undefined) body.azonosito = Number(azonosito);
      if (kolcsonzes_datuma !== undefined) body.kolcsonzes_datuma = kolcsonzes_datuma;
    
      return this.http.post('/api/createBorrowing/', body);
    }

    deleteBorrowing(sorszam: number){
      return this.http.put<any>('/api/deleteborrowing/' + sorszam,{});
    }
    


}