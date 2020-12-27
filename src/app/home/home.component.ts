import { HomeService } from './../services/http/home.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(public router: Router,
    private homeService: HomeService) { }

  ngOnInit() {
    this.callGetHello();
  }

  callGetHello() {
    this.homeService.getHello().subscribe(
      (res) => {
        console.log(res);
      }
    );
  }
}
