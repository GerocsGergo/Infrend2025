import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MediaDTO } from '../../../models';

@Injectable({ 
    providedIn: 'root' 
})


export class MediaService {
  http = inject(HttpClient);

    getAllmedia(){
          return this.http.get<MediaDTO[]>('/api/getAllMedia');
    }

    openMedia(sorszam: number){
          return this.http.get<MediaDTO>('/api/openMedia/' + sorszam);
    }

    modifyMedia(sorszam: number, cim?: string, beszerzes_datuma?: string, tipus?: string) {
      const body: any = {};
      if (cim !== undefined) body.cim = cim;
      if (beszerzes_datuma !== undefined) body.beszerzes_datuma = beszerzes_datuma;
      if (tipus !== undefined) body.tipus = tipus;
  
      return this.http.put('/api/modifyMedia/' + sorszam, body);
    }

    deleteMedia(sorszam: number){
      return this.http.put('/api/deleteMedia/' + sorszam,{});
    }


}