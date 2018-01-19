import { Component, OnInit } from '@angular/core';
import { SharedModel } from 'app/shared/sharedmodel.component';
import { LocalService } from 'app/services/localJson.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-submit',
  templateUrl: '../shared/sharedmodel.component.html',
  styleUrls: ['./review-submit.component.less']
})

export class ReviewSubmitComponent extends SharedModel implements OnInit {
  public pageTitle = 'Review Submit';
  constructor(public service: LocalService, public router: Router) {
    super(service, router);
  }

  ngOnInit() {
    this.getAppFields('review-submit');
  }

}
