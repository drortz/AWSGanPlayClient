import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MathService } from '../../services/http/math.service'
import { LoadSpinnerService } from './../../services/load-spinner.service';
import { AnswerFeedbackService } from './../../services/answer-feedback.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-Math',
  templateUrl: './Math.component.html',
  styleUrls: ['./Math.component.css'],
})
export class MathComponent implements OnInit {

  game: string;
  level: string;
  idToDisplay: string;
  gameToGameIDMap = new Map();
  LevelToLevelIDMap = new Map();
  gameEngToHeb = new Map();
  operatorToWord = new Map();
  wordToOperator = new Map();
  isLoaded = false;
  wrongAnswersCounter: number = 0;
  CorrectAnswersCounter: number = 0;
  selectedNumberOfQuestions: number = 0;

  leftNumber: number = 0;
  rightNumber: number = 0;
  operator: string = 'plus';

  mathGameData: {mathQuestions: {mathQuestion: string, 
    multipleChoise: string[], 
    correctAnswer: string, 
    id: string}[]};
  
  mathGameDataToDisplay: {mathQuestion: string, 
    multipleChoise: string[], 
    correctAnswer: string, 
    id: string};

  mathGameDataCorrect: {
    mathQuestion: string;
    multipleChoise: string[];
    correctAnswer: string;
    id: string;}[] = [];

    isAnswered: boolean = false;

  constructor(
    public router: Router,
    private mathService: MathService,
    private loadSpinner: LoadSpinnerService,
    private answerFeedback: AnswerFeedbackService,
    private activeRoute: ActivatedRoute
    ) {
      mathService.getNumberOfQuestionsObs().subscribe(
        (amount: string) => {
          this.selectedNumberOfQuestions = +amount;
        }
      );
      
      activeRoute.params.subscribe(
        val => {
          this.game = val.game;
          this.level = val.level;
          this.idToDisplay = val.id;
        }
      );
      
      this.gameToGameIDMap.set('addition-subtraction', '1');
      this.gameToGameIDMap.set('multiplication', '2');
      this.gameToGameIDMap.set('division', '2');
      this.gameEngToHeb.set('addition-subtraction', 'חיבור וחיסור');
      this.gameEngToHeb.set('multiplication', 'כפל');
      this.gameEngToHeb.set('division', 'חילוק');
      this.LevelToLevelIDMap.set('level-1', '1');
      this.LevelToLevelIDMap.set('level-2', '2');
      this.LevelToLevelIDMap.set('level-3', '3');
      this.operatorToWord.set('+', 'plus');
      this.operatorToWord.set('-', 'minus');
      this.operatorToWord.set('X', 'multiplication');
      this.wordToOperator.set('plus','+');
      this.wordToOperator.set('minus','-');
      this.wordToOperator.set('multiplication','X');

      this.mathService.setgameType(this.gameToGameIDMap.get(this.game));
      this.mathService.setLevel(this.LevelToLevelIDMap.get(this.level));
      this.mathService.setNumberOfQuestions(String(this.selectedNumberOfQuestions));
      this.mathService.receiveMathGameData().subscribe(
        (value: {mathQuestions: {mathQuestion: string, multipleChoise: string[], correctAnswer: string, id: string}[]}) => {
          this.mathGameData = value;
          this.ngOnInit();
        });
    }

  ngOnInit() {
    // this.isLoaded = true;
    this.loadSpinner.isDisplayLoading(true);
    this.loadCurrentPage();
  }

  loadCurrentPage() {
    if(this.mathGameData === undefined) {
      return;
    }

    if (+this.idToDisplay > this.mathGameData.mathQuestions.length || isNaN(+this.idToDisplay)) {
      this.idToDisplay = '1';
      this.router.navigateByUrl('/math/' + this.gameToGameIDMap.get(this.game)
              + '/' + this.LevelToLevelIDMap.get(this.level) + '/' + this.idToDisplay);
    }

    this.mathGameDataToDisplay = this.mathGameData.mathQuestions[+this.idToDisplay - 1];
    if (this.mathGameDataToDisplay === undefined) {
      this.mathGameDataToDisplay = this.mathGameData.mathQuestions[this.mathGameData.mathQuestions.length - 1];
    }

    this.splitQuestion();
    if(this.isAnsweredById(this.mathGameDataToDisplay.id)) {
      this.isAnswered = true;
    } else {
      this.isAnswered = false;
    }
    this.isLoaded = true;
    this.loadSpinner.isDisplayLoading(false);
  }

  splitQuestion() {
    let splitValues: string[] = this.mathGameDataToDisplay.mathQuestion.split(" ", 10);

    this.leftNumber = +splitValues[0];
    this.operator = this.operatorToWord.get(splitValues[1]);
    this.rightNumber = +splitValues[2];
  }

  onClickAnswer(choice: string) {
    if(choice === this.mathGameDataToDisplay.correctAnswer) {
      this.mathGameDataCorrect.push(this.mathGameDataToDisplay);
      this.isAnswered = true;
      this.CorrectAnswersCounter++;
      const source = timer(1000);
      source.subscribe(val => {
        this.answerFeedback.displayAnswerFeedback(true);
        this.answerFeedback.playSound(true);
        this.loadNextPage();
      });

    } else {
      // this.answerFeedback.displayAnswerFeedback(false);
      this.isAnswered = true;
      this.wrongAnswersCounter++;
      this.mathGameDataCorrect.push(this.mathGameDataToDisplay);
      const source = timer(1500);
      source.subscribe(val => {
        this.loadNextPage();
      });
    }
  }

  isAnsweredById(id: string) {
    for (const answeredMath of this.mathGameDataCorrect) {
      if(answeredMath.id === id) {
        return true;
      }
    }

    return false;
  }

  onImgLoad() {
    this.isLoaded = true;
    this.loadSpinner.isDisplayLoading(false);
  }

  loadNextPage() {
    const nextId = +this.idToDisplay + 1 ;
    this.idToDisplay = String(nextId);
    let url = '/math/' + this.game + '/' + 
    this.level + '/' + this.idToDisplay;
    this.router.navigateByUrl(url);
    this.ngOnInit();
  }

  loadPrevPage() {
    const nextId = +this.idToDisplay - 1 ;
    this.idToDisplay = String(nextId);
    this.router.navigateByUrl('/math/' + this.game
            + '/' + this.level + '/' + this.idToDisplay);
    this.ngOnInit();
  }

  isItTheLastPic() {
    if(this.mathGameData && this.mathGameData.mathQuestions.length && this.mathGameData.mathQuestions.length !== 0) {
      return this.idToDisplay === this.mathGameData.mathQuestions[this.mathGameData.mathQuestions.length - 1].id;
    }
    return true;
  }

  isItTheFirstPic() {
    return this.idToDisplay === '1';
  }
}

