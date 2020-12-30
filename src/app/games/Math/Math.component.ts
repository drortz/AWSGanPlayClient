import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MathService } from '../../services/http/math.service'
import { LoadSpinnerService } from './../../services/load-spinner.service';

@Component({
  selector: 'app-Math',
  templateUrl: './Math.component.html',
  styleUrls: ['./Math.component.css']
})
export class MathComponent implements OnInit {

  game: string;
  level: string;
  idToDisplay: string;
  gameToGameIDMap = new Map();
  LevelToLevelIDMap = new Map();
  gameEngToHeb = new Map();
  isLoaded = false;

  mathGameData: {mathQuestions: {mathQuestion: string, 
    multipleChoise: string[], 
    correctAnswer: string, 
    id: string}[]};
  
  mathGameDataToDisplay: {mathQuestion: string, 
    multipleChoise: string[], 
    correctAnswer: string, 
    id: string};

  constructor(
    public router: Router,
    private mathService: MathService,
    private loadSpinner: LoadSpinnerService,
    private activeRoute: ActivatedRoute
    ) { 
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
  
      this.mathService.setgameType(this.gameToGameIDMap.get(this.game));
      this.mathService.setLevel(this.LevelToLevelIDMap.get(this.level));
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

    this.isLoaded = true;
    this.loadSpinner.isDisplayLoading(false);
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

