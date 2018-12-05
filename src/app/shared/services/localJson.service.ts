import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NgProgress } from '@ngx-progressbar/core';
import * as _ from 'underscore';
import { VfRemoteService } from '../../../modules/vfremote/vf-remote.service';

import { from } from 'rxjs';

import { AppConfig } from '../common/config';

@Injectable()
export class LocalService {
	_data: any;
	private resourceurl: string;
	constructor(private http: Http, private progress: NgProgress, private vfRemote: VfRemoteService) {
		this.resourceurl = window['Dsp.Resourceurl'] ? window['Dsp.Resourceurl'] : '';
	}

	callExternalMethod(method: string, params?: any) {
		const domain = AppConfig.getDomain();
		if (domain === 'local') {
			return this.http.get(this.resourceurl + '/assets/json/get-app-fields-' + params['pageName'] + '.json').map((x) => x.json()).map((data) => {
				setTimeout(() => {
					//	this.progress.done();
				}, 100);
				data = this.preProcessData('', data);
				return (this._data = data);
			});
		} else {
			return from(this.callExternalRemote(method, params));
		}
	}

	private callExternalRemote(method: string, params: any) {
		if (!_.isEmpty(params)) {
			return this.vfRemote['DSPController']
				[method](params)
				.then((result) => {
					setTimeout(() => {
						//this.progress.done();
					}, 100);
					if (result.body) {
						return JSON.parse(result.body.replace(/&quot;/g, '"').replace(/&amp;quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\\n/g, '').replace(/&#39;/g, "'"));
					} else if (result) {
						return JSON.parse(result.replace(/&quot;/g, '"').replace(/&amp;quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\\n/g, '').replace(/&#39;/g, "'"));
					}
				})
				.catch((reason) => console.log(reason));
		} else {
			return this.vfRemote['DSPController']
				[method]()
				.then((result) => {
					setTimeout(() => {
						//this.progress.done();
					}, 100);
					if (result.body) {
						return JSON.parse(result.body.replace(/&quot;/g, '"').replace(/&amp;quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\\n/g, '').replace(/&#39;/g, "'"));
					} else if (result) {
						return JSON.parse(result.replace(/&quot;/g, '"').replace(/&amp;quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\\n/g, '').replace(/&#39;/g, "'"));
					}
				})
				.catch((reason) => console.log(reason));
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
		str = str.replace(/\"wrapper\":\"section\"/g, '"wrapper":"section"');
		return JSON.parse(str);
	}
}
