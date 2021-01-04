import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-math-intro',
  templateUrl: './math-intro.component.html',
  styleUrls: ['./math-intro.component.css']
})

export class MathIntroComponent implements OnInit {
  
  constructor(public router: Router) { }



  ngOnInit() {

  }

  buildUrlToPost() {

  }

}
