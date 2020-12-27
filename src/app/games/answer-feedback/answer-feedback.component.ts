import { AnswerFeedbackService } from './../../services/answer-feedback.service';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-answer-feedback',
  templateUrl: './answer-feedback.component.html',
  styleUrls: ['./answer-feedback.component.css']
})
export class AnswerFeedbackComponent implements OnInit {
  correctMessage = 'יפה מאוד !';
  correctImage = '../../../assets/images/Smily.png';
  IncorrectMessage = 'נסו שוב';
  IncorrectImage = '../../../assets/images/smilyConfuzed.png';
  feedbackMessage: string;
  imagePath: string;

  audioCorrectSrc = "../../../assets/sound/correct.mp3";

  audio = new Audio();

  constructor(private answerFeedbackService: AnswerFeedbackService) {
    answerFeedbackService.getIsAnswerCorrectObs().subscribe(
      (isAnswerCorrect) => {
        if (isAnswerCorrect) {
          this.loadCorrectFeedback();
        } else {
          this.loadWrongFeedback();
        }
        this.show();
        const source = timer(1500);
          const abc = source.subscribe(val => {
            this.hide();
        });
      }
    );

    answerFeedbackService.getPlaySoundperInput().subscribe(
      (isAnswerCorrect) => {
        if(isAnswerCorrect) {
          //play correct sound
          this.audio.src = this.audioCorrectSrc;
        } else {
          //play incorrect sound
        }
        // this.audio.load();
        this.audio.play();
      }
    )
  }

  loadCorrectFeedback() {
    this.feedbackMessage = this.correctMessage;
    this.imagePath = this.correctImage;
  }

  loadWrongFeedback() {
    this.feedbackMessage = this.IncorrectMessage;
    this.imagePath = this.IncorrectImage;
  }

  ngOnInit() {
  }

  show() {
    $("#answerFeedback").modal('show');
  }

  hide() {
    $("#answerFeedback").modal('hide');
  }
}
