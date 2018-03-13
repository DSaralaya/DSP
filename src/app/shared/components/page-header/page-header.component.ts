import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html'
 
})
export class PageHeaderComponent implements OnInit {

  public pageName: any;
	component: any;
  pageFlow: any;
  prevUrl:any;
  constructor(private vcRef: ViewContainerRef) {}

  ngOnInit() {
   //debugger;
		this.component = this.vcRef['_view']['component'];
		this.pageFlow = this.component['pageFlow'];
    this.pageName = this.component['pageName'];
    this.prevUrl=this.component['prevUrl'];
	}



}
