import { LoadSpinnerService } from './../../../services/load-spinner.service';
import { LettersService } from './../../../services/http/letters.service';
import { AnswerFeedbackService } from './../../../services/answer-feedback.service';
import { Component, OnInit } from '@angular/core';
import { DragDropModule, CdkDragDrop, transferArrayItem, moveItemInArray, CdkDrag, copyArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.css']
})
export class LettersComponent implements OnInit {

  letters = ['ט','ח','ז','ו','ה','ד','ג','ב','א'];
  letters2 = ['צ','פ','ע','ס','נ','מ','ל','כ','י'];
  letters3 = ['ץ','ף','ן','ם','ך','ת','ש','ר','ק'];

  firstLetter = [];
  lastLetter = [];

  idToDisplay: string;

  lettersDataToDisplay: {imageUrl: string, firstLetter: string, lastLetter: string, id: string};
  lettersData: {imageUrl: string, firstLetter: string, lastLetter: string, id: string}[] = [];
  lettersDataCorrect: {imageUrl: string, firstLetter: string, lastLetter: string, id: string}[] = [];

  isFirstLetterCorrect: boolean;
  isLastLetterCorrect: boolean;
  isLoaded = false;
  isAnswered = false;

  constructor(public dragDrop: DragDropModule,
    private router: Router,
    private lettersService: LettersService,
    private answerFeedback: AnswerFeedbackService,
    private loadSpinner: LoadSpinnerService,
    private activeRoute: ActivatedRoute) {
      activeRoute.params.subscribe(
        val => {
          this.idToDisplay = val.id;
          this.ngOnInit();
        }
      );


      this.lettersService.getLettersData().subscribe(
        (value: {imageUrl: string, firstLetter: string, lastLetter: string, id: string}[]) => {
          this.setLettersData(value);
          this.ngOnInit();
        }
      );
     }

  ngOnInit() {
    this.loadSpinner.isDisplayLoading(true);
    this.loadCurrentPage();
  }

  setLettersData(data: {imageUrl: string, firstLetter: string, lastLetter: string, id: string}[]) {
    this.lettersData = data;
  }

  loadCurrentPage() {
    if (+this.idToDisplay > this.lettersData.length || isNaN(+this.idToDisplay)) {
      this.idToDisplay = '1';
      this.router.navigateByUrl('/letters/' + this.idToDisplay);
      return;
    }

    this.lettersDataToDisplay = this.lettersData[+this.idToDisplay - 1];
    if (this.lettersDataToDisplay === undefined) {
      this.lettersDataToDisplay = this.lettersData[this.lettersData.length - 1];
    }

    if(this.isAnsweredById(this.lettersDataToDisplay.id)) {
      this.isAnswered = true;
      this.firstLetter = [this.lettersDataToDisplay.firstLetter];
      this.lastLetter = [this.lettersDataToDisplay.lastLetter];
    } else {
      this.isAnswered = false;
      this.firstLetter = [];
      this.lastLetter = [];
    }

    this.clearFirstOrLastLetterCorrect();
  }

  isAnsweredById(id: string) {
    for (const answeredLetter of this.lettersDataCorrect) {
      if(answeredLetter.id === id) {
        return true;
      }
    }

    return false;
  }

  loadMockData() {
    this.lettersData = [{imageUrl: "https://extension.usu.edu/yardandgarden/ou-images/apples.png", firstLetter: 'ת', lastLetter: 'ח', id: '1'},
    {imageUrl: "https://target.scene7.com/is/image/Target/GUEST_f5d0cfc3-9d02-4ee0-a6c6-ed5dc09971d1?wid=488&hei=488&fmt=pjpeg", firstLetter: 'ב', lastLetter: 'ה', id: '2'}];
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // transferArrayItem(event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex);
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    if(this.isCompletelyAnswered()) {
      this.lettersDataCorrect.push(this.lettersDataToDisplay);
      this.isAnswered = true;
      const source = timer(1000);
          const abc = source.subscribe(val => {
            this.answerFeedback.displayAnswerFeedback(true);
            this.answerFeedback.playSound(true);
            if(!this.isItTheLastPic()) {
              this.loadNextPage();
            }
          });
    }
  }

  isCompletelyAnswered() {
    if (!this.lettersDataToDisplay) {
      return false;
    }

    if (this.lettersDataToDisplay.lastLetter && this.firstLetter[0]) {
      this.isFirstLetterCorrect = true;
    }
    if (this.lastLetter[0] === this.lettersDataToDisplay.lastLetter) {
      this.isLastLetterCorrect = true;
    }
    return this.lastLetter[0] === this.lettersDataToDisplay.lastLetter && this.firstLetter[0] === this.lettersDataToDisplay.firstLetter;
  }

  noReturnPredicate() {
    return false;
  }

  dynamicPredicateFirstLetter = (item: CdkDrag<any>) => {
    return item.element.nativeElement.textContent === this.lettersDataToDisplay.firstLetter;

  }

  dynamicPredicateLastLetter = (item: CdkDrag<any>) => {
    return item.element.nativeElement.textContent === this.lettersDataToDisplay.lastLetter;
  }

  isItTheLastPic() {
    if(this.lettersData.length !== 0) {
      return this.idToDisplay === this.lettersData[this.lettersData.length - 1].id;
    }
    return true;
  }

  isItTheFirstPic() {
    return this.idToDisplay === '1';
  }

  loadNextPage() {
    const nextId = +this.idToDisplay + 1 ;
    this.idToDisplay = String(nextId);
    this.clearFirstAndLastLetters();
    this.router.navigateByUrl('/letters/' + this.idToDisplay);
  }

  loadPrevPage() {
    const nextId = +this.idToDisplay - 1 ;
    this.idToDisplay = String(nextId);
    this.clearFirstAndLastLetters();
    this.router.navigateByUrl('/letters/' + this.idToDisplay);
  }

  clearFirstAndLastLetters() {
    this.firstLetter = [];
    this.lastLetter = [];
  }

  clearFirstOrLastLetterCorrect() {
    this.isFirstLetterCorrect = false;
    this.isLastLetterCorrect = false;
  }

  onImgLoad() {
    this.isLoaded = true;
    this.loadSpinner.isDisplayLoading(false);
  }
}
