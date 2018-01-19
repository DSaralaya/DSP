import { Component, OnInit } from '@angular/core';
import { LocalService } from 'app/services/localJson.service';
import { Router } from '@angular/router';
import { SharedModel } from 'app/shared/sharedmodel.component';

@Component({
  selector: 'app-cross-sell',
  templateUrl: '../shared/sharedmodel.component.html',
  styleUrls: ['cross-sell.component.less']
})

export class CrossSellComponent extends SharedModel implements OnInit {
  public pageTitle = 'Cross Sell';
  constructor(public service: LocalService, public router: Router) {
    super(service, router);
  }

  ngOnInit() {
    this.getAppFields('cross-sell');
  }

}
