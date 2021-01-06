import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MathService } from '../../../services/http/math.service';
declare var $: any;

@Component({
  selector: 'app-math-intro',
  templateUrl: './math-intro.component.html',
  styleUrls: ['./math-intro.component.css']
})

export class MathIntroComponent implements OnInit {
  
  constructor(public router: Router,
    public mathService: MathService) { }

  selectedQuestionAmountValue: string = '20';
  
  ngOnInit() {
    this.mathService.getNumberOfQuestionsObs().next('20');
  }

  onAmountSelect(selected: string) {
    this.mathService.getNumberOfQuestionsObs().next(selected);
  }

  

}
