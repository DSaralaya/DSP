import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NgProgress } from "@ngx-progressbar/core";

@Injectable()
export class LocalService {
  _data: any
  constructor(private http: Http, private progress: NgProgress) { }

  get(file) {
    return this.http
      .get('/assets/json/get-app-fields-' + file + '.json')
      .map(x => x.json())
      .map((data) => {
        setTimeout(() => {
          this.progress.done();
        }, 400);
        return this._data = data;

      }

      )
  }
}