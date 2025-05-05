import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomerDTO } from '../../../models';

@Injectable({ 
    providedIn: 'root' 
})


export class CustomerService {
  http = inject(HttpClient);

    getAllCustomer(){
        return this.http.get<CustomerDTO[]>('/api/getAllCustomer');
    }

    findCustomers(azonosito?: number, szemelyiszam?: string, nev?: string) {
      let params = new HttpParams();
  
      if (azonosito !== undefined) {
        params = params.set('azonosito', azonosito);
      }
      if (szemelyiszam) {
        params = params.set('szemelyiszam', szemelyiszam);
      }
      if (nev) {
        params = params.set('nev', nev);
      }
  
      return this.http.get<CustomerDTO | CustomerDTO[]>('/api/findCustomers', { params });
    }

    modifyCustomer(azonosito: number, nev?: string, telefonszam?: string, szemelyiszam?: string, lakcim?: string) {
      const body: any = {};
      if (nev !== undefined) body.nev = nev;
      if (telefonszam !== undefined) body.telefonszam = telefonszam;
      if (szemelyiszam !== undefined) body.szemelyiszam = szemelyiszam;
      if (lakcim !== undefined) body.lakcim = lakcim;
  
      return this.http.put('/api/modifyCustomer/' + azonosito, body);
    }

    deleteCustomer(azonosito: number){
      return this.http.put('/api/deleteCustomer/' + azonosito,{});
    }

    activateCustomer(azonosito: number){
      return this.http.put('/api/activateCustomer/' + azonosito,{});
    }

    openCustomer(azonosito: number){
      return this.http.get<CustomerDTO>('/api/openCustomer/' + azonosito);
    }

    createCustomer(nev: string, telefonszam: string, szemelyiszam: string, lakcim: string){
      const body: any = {};

      if (nev !== undefined) body.nev = nev;
      if (telefonszam !== undefined) body.telefonszam = telefonszam;
      if (szemelyiszam !== undefined) body.szemelyiszam = szemelyiszam;
      if (lakcim !== undefined) body.lakcim = lakcim;

      return this.http.post('/api/createCustomer/', body);
    }

}