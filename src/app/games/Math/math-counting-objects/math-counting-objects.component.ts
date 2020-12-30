import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-math-counting-objects',
  templateUrl: './math-counting-objects.component.html',
  styleUrls: ['./math-counting-objects.component.css']
})
export class MathCountingObjectsComponent implements OnInit {

  @Input("leftNumber")
  leftNumber: number;
  @Input("rightNumbet")
  rightNumber: number;
  @Input("operator")
  operator: string;

  operatorToImageMap = new Map();

  constructor() { 
    this.operatorToImageMap.set("../../../../assets/images/PlusSign.png", "+");
    this.operatorToImageMap.set("../../../../assets/images/MinusSign.png", "-");
    // this.operatorToImageMap.set("multiplication", "X");
  }

  ngOnInit() {
  }

}
