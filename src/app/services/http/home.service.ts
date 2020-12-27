import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  url = 'https://ganplay.appspot.com';

  getHello() {
    return this.httpClient.get(this.url);
  }
}
