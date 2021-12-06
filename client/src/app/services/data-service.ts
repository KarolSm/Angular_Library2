import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseURL: string;

  constructor(private httpClient: HttpClient) {
    this.baseURL = "http://localhost:3000"
  }

  getMagazines() {
    return this.httpClient.get(this.baseURL + '/pisma').toPromise()
  }
// dostepne lata dla danego pisma np Atari_Age
  getYears(magazine: string) {
    return this.httpClient.get(this.baseURL + '/lata/' + magazine)
  }

  getData(magazine: string, rok: string) {
    console.log(rok)
    const params = rok === '' ? undefined : new HttpParams().set('rok', rok)
    return this.httpClient.get(this.baseURL + '/dane/' + magazine, { params }).toPromise() //memory leakfix app.com.ts
  }
}
