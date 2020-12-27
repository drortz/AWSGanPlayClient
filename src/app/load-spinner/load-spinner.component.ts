import { LoadSpinnerService } from './../services/load-spinner.service';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.css']
})
export class LoadSpinnerComponent implements OnInit {

  constructor(private loadSpinner: LoadSpinnerService) {
    loadSpinner.getIsToShowLoadingObs().subscribe(
      (isToShowLoading) => {
        if(isToShowLoading) {
          this.show();
        }
        else {
          this.hide();
        }
      }
    );
  }

  ngOnInit() {
  }

  show() {
    $("#load-modal").modal('show');
  }

  hide() {
    $("#load-modal").modal('hide');
  }
}
