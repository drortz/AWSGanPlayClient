import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountingService {

  constructor(private httpClient: HttpClient ) { }

  url = environment.url + 'CountingData';

  getCountingData() {
    return this.httpClient.get(this.url);
  }

  postCountingData(counitngData: {imageUrl: string, answer: string, subject: string ,id: string}) {
    return this.httpClient.post(this.url, counitngData);
  }
}
