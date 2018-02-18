export class AppConfig {
	public static getDomain() {
		const domain = document.location.hostname.indexOf('localhost') >= 0 ? 'local' : 'remote';
		return domain;
	}
	public static GetPageName(model) {
		return '';
	}

	public static NextPage(model, pagename) {
		if (model) {
			const pageFlow = model.filter(function(t) {
				return t['path'] === pagename;
			});
			if (pageFlow.length > 0) {
				return pageFlow[0]['nextPage'] === null ? '' : pageFlow[0]['nextPage'];
			}
		}
		return '';
	}

	public static PrevPage(model, pagename) {
		if (model) {
			const pageFlow = model.filter(function(t) {
				return t['path'] === pagename;
			});
			if (pageFlow.length > 0) {
				return pageFlow[0]['prevPage'];
			}
		}
		return '';
	}
}
