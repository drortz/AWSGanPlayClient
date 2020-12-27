import { Component, OnInit, EventEmitter , Output, Input } from '@angular/core';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent implements OnInit {

  @Input() isAnswered: boolean;
  @Input() answer: string;
  @Output() selectedNumber = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onNumberClick(clickedNumber: string) {
    this.selectedNumber.emit(clickedNumber);
  }

  isCorrectNumberPerInputNumber(number: string) {
    return number === this.answer;
  }

}
