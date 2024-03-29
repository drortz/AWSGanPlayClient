import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() imageUrl: string;
  @Input() isAnswered: boolean;
  @Output() loaded = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  imgLoaded(event) {
    this.loaded.emit(true);
  }
}
