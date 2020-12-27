import { Injectable } from '@angular/core';
import { Observable , of as observableOf, Subject, BehaviorSubject} from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class AnswerFeedbackService {
  private isAnswerCorrectObs: BehaviorSubject<boolean> = new BehaviorSubject(null);
  private playSoundperInput: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor() {

  }

  displayAnswerFeedback(isCorrect: boolean) {
    this.isAnswerCorrectObs.next(isCorrect);
  }

  playSound(isCorrect: boolean) {
    this.playSoundperInput.next(isCorrect);
  }

  getIsAnswerCorrectObs() {
    return this.isAnswerCorrectObs;
  }

  getPlaySoundperInput() {
    return this.playSoundperInput;
  }
}
