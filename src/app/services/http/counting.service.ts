import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountingService {

  constructor(private httpClient: HttpClient ) { }

  url = 'https://ganplay.appspot.com/CountingData';
  // url = 'http://localhost:8080/CountingData';


  getCountingData() {
    return this.httpClient.get(this.url);
  }

  postCountingData(counitngData: {imageUrl: string, answer: string, subject: string ,id: string}) {
    return this.httpClient.post(this.url, counitngData);
  }
}
