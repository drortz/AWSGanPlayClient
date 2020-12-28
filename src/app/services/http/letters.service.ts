import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LettersService {

  constructor(private httpClient: HttpClient) { }

  url = environment.url + 'Letters';

  getLettersData() {
    return this.httpClient.get(this.url);
  }
}
