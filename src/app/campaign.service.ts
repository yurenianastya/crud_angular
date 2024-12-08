import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CampaignService {

  baseUrl: string = "http://localhost:3000/";
  readonly httpClient = inject(HttpClient);


  addCampaign(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'campaigns/', data);
  }

  updateCampaign(id: number, data: any) {
    return this.httpClient.put(this.baseUrl + 'campaigns/' + id, data)
  }

  getCampaigns(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'campaigns');
  }

  getCampaign(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'campaigns/' + id);
  }

  deleteCampaign(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'campaigns/' + id)
  }

  getBalance(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'balance');
  }

  updateBalance(balance: object): Observable<any> {
    return this.httpClient.patch(this.baseUrl + 'balance/1', balance);
  }
  
}
