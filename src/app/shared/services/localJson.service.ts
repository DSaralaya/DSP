import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NgProgress } from '@ngx-progressbar/core';
import * as _ from 'underscore';
import { VfRemoteService } from '../../../modules/vfremote/vf-remote.service';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class LocalService {
	_data: any;
	private resourceurl: string;
	constructor(private http: Http, private progress: NgProgress, private vfRemote: VfRemoteService) {
		this.resourceurl = window['Dsp.Resourceurl'] ? window['Dsp.Resourceurl'] : '';
	}

	private getRemote(file) {
		debugger;
		return this.vfRemote['DSPController']
			['getAppFieldsdelete'](file)
			.then((result) => {
				let data = JSON.parse(result.body.replace(/&quot;/g, '"').replace(/&amp;quot;/g, '"').replace(/\\n/g, '').replace(/&#39;/g, "'"));
				data = this.preProcessData(file, data);
				return (this._data = data);
			})
			.catch((reason) => console.log(reason));
	}

	callExternalMethod(method: string, params?: any) {
		return Observable.fromPromise(this.callExternalRemote(method, params));
	}

	private callExternalRemote(method: string, params: any[]) {
		debugger;
		if (params.length > 0) {
			const fn = this.vfRemote['DSPController'][method];
			return fn(params)
				.then((result) => {
					if (result.body) {
						return JSON.parse(result.body.replace(/&quot;/g, '"').replace(/&amp;quot;/g, '"').replace(/\\n/g, '').replace(/&#39;/g, "'"));
					} else if (result) {
						return JSON.parse(result.replace(/&quot;/g, '"').replace(/&amp;quot;/g, '"').replace(/\\n/g, '').replace(/&#39;/g, "'"));
					}
				})
				.catch((reason) => console.log(reason));
		} else {
			const fn = this.vfRemote['DSPController'][method];
			return fn()
				.then((result) => {
					if (result.body) {
						return JSON.parse(result.body.replace(/&quot;/g, '"').replace(/&amp;quot;/g, '"').replace(/\\n/g, '').replace(/&#39;/g, "'"));
					} else if (result) {
						return JSON.parse(result.replace(/&quot;/g, '"').replace(/&amp;quot;/g, '"').replace(/\\n/g, '').replace(/&#39;/g, "'"));
					}
				})
				.catch((reason) => console.log(reason));
		}
	}

	get(file) {
		debugger;
		const domain = document.location.hostname.indexOf('localhost') >= 0 ? 'local' : 'remote';
		if (domain === 'local') {
			return this.http.get(this.resourceurl + '/assets/json/get-app-fields-' + file + '.json').map((x) => x.json()).map((data) => {
				setTimeout(() => {
					this.progress.done();
				}, 100);
				data = this.preProcessData(file, data);
				return (this._data = data);
			});
		} else {
			return Observable.fromPromise(this.getRemote(file));
		}
	}

	private preProcessData(file, data) {
		if (file === 'cross-sell') {
			data['crossSell1_offerDeclined'] = false;
			data['crossSell2_offerDeclined'] = false;
			data['crossSell3_offerDeclined'] = false;
		}
		let str = JSON.stringify(data);
		str = str.replace(/\"className\":\"row\"/g, '"fieldGroupClassName":"row"');
		str = str.replace(/\"wrapper\":\"section\"/g, '"wrappers":"section"');
		return JSON.parse(str);
	}
}
