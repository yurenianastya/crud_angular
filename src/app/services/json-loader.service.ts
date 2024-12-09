import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JsonLoaderService {

  readonly http = inject(HttpClient);

  getKeywords(): Observable<string[]> {
    return this.http.get<string[]>('/data/typeword-example.json');
  }

  getTowns(): Observable<string[]> {
    return this.http.get<string[]>('/data/town-example.json');
  }

}
