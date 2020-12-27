import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-counting-intro',
  templateUrl: './counting-intro.component.html',
  styleUrls: ['./counting-intro.component.css']
})

export class CountingIntroComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {

  }


}
