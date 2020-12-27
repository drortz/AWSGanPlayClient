import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-letters-intro',
  templateUrl: './letters-intro.component.html',
  styleUrls: ['./letters-intro.component.css']
})
export class LettersIntroComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
