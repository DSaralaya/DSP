export class VfRemoteController {
	[key: string]: (...args: Array<any>) => Promise<any | Error>;
}
