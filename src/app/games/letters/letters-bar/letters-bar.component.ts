import { Component, OnInit } from '@angular/core';
import { DragDropModule, CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-letters-bar',
  templateUrl: './letters-bar.component.html',
  styleUrls: ['./letters-bar.component.css']
})
export class LettersBarComponent implements OnInit {


  letters = ['ט','ח','ז','ו','ה','ד','ג','ב','א'];
  letters2 = ['צ','פ','ע','ס','נ','מ','ל','כ','י'];
  letters3 = ['ץ','ף','ן','ם','ך','ת','ש','ר','ק'];

  constructor(public dragDrop: DragDropModule) { }

  ngOnInit() {
  }

  noReturnPredicate() {
    return false;
  }


}
