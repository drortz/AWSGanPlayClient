import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LettersService {

  constructor(private httpClient: HttpClient) { }

  url = 'https://ganplay.appspot.com/Letters';

  getLettersData() {
    return this.httpClient.get(this.url);
  }
}
