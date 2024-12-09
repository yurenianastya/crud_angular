import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CampaignService {

  baseUrl: string = "http://localhost:3000/";
  readonly httpClient = inject(HttpClient);
  balanceSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.fetchInitialBalance();
  }

  get balance$(): Observable<number> {
    return this.balanceSubject.asObservable();
  }

  private fetchInitialBalance(): void {
    this.httpClient.get<any>(this.baseUrl + 'balance').subscribe({
      next: (res) => {
        this.balanceSubject.next(res.value);
      },
      error: (err) => {
        console.error('Error fetching initial balance:', err);
      },
    });
  }

  private updateServerBalance(balance: number): void {
    let payload = { "value": balance };
    this.httpClient.put(this.baseUrl + 'balance', payload).subscribe({
      error: (err) => {
        console.error('Error updating balance:', err);
      },
    });
  }

  updateBalance(amount: number): void {
    const currentBalance = this.balanceSubject.getValue();
    this.balanceSubject.next(currentBalance + amount);
    this.updateServerBalance(this.balanceSubject.getValue())
  }

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
  
}
