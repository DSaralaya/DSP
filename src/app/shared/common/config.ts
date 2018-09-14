export class AppConfig {
	public static getDomain() {
		const domain = document.location.hostname.indexOf('localhost') >= 0 || document.location.hostname.indexOf('192') >= 0   ? 'local' : 'remote';
		return domain;
	}
	
	public static NextPage(model) {
		if (model['pageFlowMap']) {
			const pageFlow=typeof(model['pageFlowMap'])==='object'?model['pageFlowMap']: JSON.parse(model['pageFlowMap']);
			return pageFlow['nextPage'];
		}
		return '';
	}

	public static PrevPage(model) {
		if (model['pageFlowMap']) {
			//const pageFlow = JSON.parse(model['pageFlowMap']['Body'].replace(/&quot;/g, '"'));
			const pageFlow=typeof(model['pageFlowMap'])==='object'?model['pageFlowMap']: JSON.parse(model['pageFlowMap']);
			return pageFlow['prevPage'];
		}
		return '';
	}

	public static CurrentPage(model) {
		if (model['pageFlowMap']) {
			//const pageFlow = JSON.parse(model['pageFlowMap']['Body'].replace(/&quot;/g, '"'));
			const pageFlow=typeof(model['pageFlowMap'])==='object'?model['pageFlowMap']: JSON.parse(model['pageFlowMap']);
			return pageFlow['currentPage'];
		}
		return '';
	}
}
