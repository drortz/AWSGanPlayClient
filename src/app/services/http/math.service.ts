import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  // /math/addition-subtraction/level-1/1

  url = environment.url + 'receiveMathGame';
  gameType: string;
  level: string;

  constructor(private httpClient: HttpClient) {
   }

   setgameType(gameType: string) {
     this.gameType = gameType;
   }

   setLevel(level: string) {
     this.level = level;
   }

  receiveMathGameData() {
    return this.httpClient.post(this.url, {gameType: this.gameType, level: this.level});
  }
}
