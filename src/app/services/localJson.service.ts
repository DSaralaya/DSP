import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NgProgress } from '@ngx-progressbar/core';
import * as _ from 'underscore';

@Injectable()
export class LocalService {
  _data: any;
  private resourceurl: string;
  constructor(private http: Http, private progress: NgProgress) {
    this.resourceurl = window['Resourceurl'] ? window['Resourceurl'] + '/dist' : '';
   }

  get(file) {
    return this.http
      .get(this.resourceurl + '/assets/json/get-app-fields-' + file + '.json')
      .map(x => x.json())
      .map((data) => {
        setTimeout(() => {
          this.progress.done();
        }, 100);
        data = this.preProcessData(file, data);
        return this._data = data;
      });
  }

  preProcessData(file, data) {
    if (file === 'cross-sell') {
      data['crossSell1_offerDeclined'] = false;
      data['crossSell2_offerDeclined'] = false;
      data['crossSell3_offerDeclined'] = false;
    }
    let str = JSON.stringify(data);
    str = str.replace(/\"className\":\"row\"/g, '\"fieldGroupClassName\":\"row\"');
    str = str.replace(/\"wrapper\":\"section\"/g, '\"wrappers\":\"section\"');
    return JSON.parse(str);
  }
}
