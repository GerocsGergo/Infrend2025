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
    
}