import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  // /math/addition-subtraction/level-1/1

  url = environment.url + 'receiveMathGame';
  gameType: string;
  level: string;
  numberOfQuestions: string;
  private numberOfQuestionsObs: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {
   }

   getNumberOfQuestionsObs() {
     return this.numberOfQuestionsObs;
   }

   updateNumberOfQuestions(amount: string) {
    this.numberOfQuestionsObs.next(amount);
   }

   setgameType(gameType: string) {
     this.gameType = gameType;
   }

   setLevel(level: string) {
     this.level = level;
   }

   setNumberOfQuestions(numberOfQuestions: string) {
    this.numberOfQuestions = numberOfQuestions;
   }

  receiveMathGameData() {
    return this.httpClient.post(this.url, {gameType: this.gameType, level: this.level, numberOfQuestions: this.numberOfQuestions});
  }
}
