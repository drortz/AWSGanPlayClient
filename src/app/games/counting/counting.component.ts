import { LoadSpinnerService } from './../../services/load-spinner.service';
import { AnswerFeedbackService } from './../../services/answer-feedback.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountingService } from 'src/app/services/http/counting.service';
import { timer } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-counting',
  templateUrl: './counting.component.html',
  styleUrls: ['./counting.component.css']
})
export class CountingComponent implements OnInit {
  idToDisplay: string;
  pathParam = 'id';
  countingDataToDisplay: {imageUrl: string, answer: string, subject: string ,id: string};
  countingData: {imageUrl: string, answer: string, subject: string ,id: string}[] = [];
  countingDataCorrect: {imageUrl: string, answer: string, subject: string ,id: string}[] = [];
  isLoaded = false;
  isAnswered = false;

  constructor(
    private route: ActivatedRoute,
    private answerFeedbackService: AnswerFeedbackService,
    private router: Router,
    private countingService: CountingService,
    // private snackBar: MatSnackBar,
    private loadSpinner: LoadSpinnerService,
    private activeRoute: ActivatedRoute) {
      activeRoute.params.subscribe(
        val => {
          this.idToDisplay = val.id;
          this.ngOnInit();
        }
      );


      this.countingService.getCountingData().subscribe(
        (value: {imageUrl: string, answer: string, subject: string, id: string}[] ) => {
          this.setCountingData(value);
          this.loadCurrentPage();

        }
      );
    }

  ngOnInit() {
    this.loadSpinner.isDisplayLoading(true);
    this.loadCurrentPage();
  }

  setCountingData(data) {
    this.countingData = data;
  }

  loadCurrentPage() {
    if (+this.idToDisplay > this.countingData.length || isNaN(+this.idToDisplay)) {
      this.idToDisplay = '1';
      this.router.navigateByUrl('/counting/' + this.idToDisplay);
      return;
    }

    this.countingDataToDisplay = this.countingData[+this.idToDisplay - 1];
    if (this.countingDataToDisplay === undefined) {
      this.countingDataToDisplay = this.countingData[this.countingData.length - 1];
    }

    if (this.isCurrectCardWasAnsweredById(this.countingDataToDisplay.id)) {
      this.isAnswered = true;
    } else {
      this.isAnswered = false;
    }
  }

  isCurrectCardWasAnsweredById(id: string) {
    for (const answeredCounting of this.countingDataCorrect) {
      if (answeredCounting.id === id) {
        return true;
      }
    }

    return false;
  }

  onSelectedNumber(selectedNumber: string) {
    if(this.countingDataToDisplay.answer === selectedNumber) {
      // good asnwer
      this.countingDataCorrect.push(this.countingDataToDisplay);
      this.answerFeedbackService.displayAnswerFeedback(true);
      this.answerFeedbackService.playSound(true);
      const source = timer(1500);
          const abc = source.subscribe(val => {
            if(!this.isItTheLastPic()) {
              this.loadNextPage();
            }
        });

      // if (!this.isItTheLastPic()) {
      //   this.loadNextPage();
      // }
    } else {
      // wrong answer
      // this.snackBar.open('נסו שוב');
      this.answerFeedbackService.displayAnswerFeedback(false);
      // this.answerFeedbackService.playSound(false);
    }
  }

  loadMockDada() {
    this.countingData = [
      {imageUrl : "https://extension.usu.edu/yardandgarden/ou-images/apples.png", answer: '2', subject: 'תפוחים',id: '1'},
      {imageUrl : "https://target.scene7.com/is/image/Target/GUEST_f5d0cfc3-9d02-4ee0-a6c6-ed5dc09971d1?wid=488&hei=488&fmt=pjpeg", answer: '1', subject: 'בננות',id: '2'},
      {imageUrl : "http://ae01.alicdn.com/kf/HTB1JPz3ibZnBKNjSZFrq6yRLFXac/Ladybug-pen-drive-usb2-0-flash-drive-cartoon-cute-beetles-memory-stick-real-capacity-usb-flash.jpg_220x220q90.jpg", answer: '3', subject: 'חיפושיות',id: '3'}
    ]
  }

  isItTheLastPic() {
    if(this.countingData.length !== 0) {
      return this.idToDisplay === this.countingData[this.countingData.length - 1].id;
    }
    return true;
  }

  isItTheFirstPic() {
    return this.idToDisplay === '1';
  }

  loadNextPage() {
    const nextId = +this.idToDisplay + 1 ;
    this.idToDisplay = String(nextId);
    this.router.navigateByUrl('/counting/' + this.idToDisplay);
  }

  loadPrevPage() {
    const nextId = +this.idToDisplay - 1 ;
    this.idToDisplay = String(nextId);
    this.router.navigateByUrl('/counting/' + this.idToDisplay);
  }

  disableBackButton() {
    $('backbutton').button('toggle');
  }

  imageLoaded(wasLoaded: boolean) {
    this.isLoaded = wasLoaded;
    this.loadSpinner.isDisplayLoading(false);
  }
}
