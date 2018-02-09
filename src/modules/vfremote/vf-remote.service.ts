import { Injectable } from '@angular/core';
import { SFDCEvent } from './sfdc-event';
import { VfRemoteController } from './vf-remote-controller';

@Injectable()
export class VfRemoteService {
	constructor() {
		this.registerMethods();
	}

	getCtrl(controller: string): VfRemoteController {
		if (!this.hasOwnProperty(controller)) {
			throw `${controller} is not an available remoting controller`;
		}
		return this[controller];
	}

	getFn(controller: string, method: string): (...args: Array<any>) => Promise<any | Error> {
		const ctrl = this.getCtrl(controller);
		if (!ctrl.hasOwnProperty(method)) {
			throw `${method} is not an available remote action on ${controller}`;
		}
		return ctrl[method];
	}

	private registerMethods(): void {
		const force = window['Visualforce'];
		if (force) {
			const actions: Object = Visualforce.remoting.last.actions;
			for (const controller in actions) {
				if (!this.hasOwnProperty(controller)) {
					this[controller] = new VfRemoteController();
				}
				// the actual javascript functions for the controller sit on an object declared in the global window.
				const wCtrl: Object = window[controller];
				for (const prop in wCtrl) {
					if (wCtrl.hasOwnProperty(prop) && typeof wCtrl[prop] === 'function') {
						const fn: Function = wCtrl[prop];
						const boundFn = fn.bind(wCtrl);
						this[controller][prop] = this.wrap(boundFn);
					}
				}
			}
		}
	}

	private wrap(fn: Function): (...args: Array<any>) => Promise<any | Error> {
		return (...args: Array<any>): Promise<any | Error> => {
			const ret: Promise<any | Error> = new Promise((resolve, reject): void => {
				const callback = (result: any, event: SFDCEvent) => {
					if (event.status) {
						resolve(result);
					} else {
						const err = new Error(event.message);
						if (event.type === 'exception') {
							err.stack = event.where;
						}
						reject(err);
					}
				};
				args.push(callback);
				args.push({ buffer: true, escape: true });

				fn.apply(null, args);
			});

			return ret;
		};
	}
}
