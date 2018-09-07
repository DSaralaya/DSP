export class AppConfig {
	public static getDomain() {
		const domain = document.location.hostname.indexOf('localhost') >= 0 || document.location.hostname.indexOf('192') >= 0   ? 'local' : 'remote';
		return domain;
	}

	public static GetPageName(model) {
		if (model && model['pageCode']) {
			const pagecode = model['pageCode']['Body'].replace(/&quot;/g, '"');
			return this.appPageCodes[pagecode];
		}
		return '';
	}
	public static appPagesRoutes: any = {
		GetStartedPage: 'get-started',
		CrossSellPage: 'cross-sell',
		PersonalInfoPage: 'form/personal-info',
		EmploymentPage: 'form/employment',
		IdentityPage: 'form/identity',
		AccountDetailsPage: 'account-details',
		PurchaseDetailsPage: 'purchase-details',
		PropertyDetailsPage: 'property-details',
		DeclarationsPage: 'declarations',
		ReviewSubmitPage: 'review-submit',
		ConfirmationPage: 'confirmation'
	};

	public static appPageCodes: any = {
		ELG: 'EligibilityPage',
		EP: 'EmploymentPage',
		SPP: 'StatusPortalPage',
		SEP: 'SessionExpiredPage',
		SP: 'SchedulePage',
		SFL: 'SaveForLaterPage',
		RS: 'ReviewSubmitPage',
		PUD: 'PurchaseDetailsPage',
		PRD: 'PropertyDetailsPage',
		PI: 'PersonalInfoPage',
		Index: 'IndexPage',
		IP: 'IdentityPage',
		GS: 'GetStartedPage',
		DeclarationsPage: 'DP',
		CSP: 'CrossSellPage',
		CP: 'ConfirmationPage',
		AppStatusPage: 'AS',
		AppRetrievalPage: 'AR',
		AD: 'AccountDetailsPage',
		DynamicPagesPage: 'DPP',
		VerifyIdentityPage: 'VI'
	};

	public static NextPage(model) {
		if (model['pageFlowMap']) {
			debugger;
			const pageFlow=model['pageFlowMap']['Body'];
			//const pageFlow = JSON.parse(model['pageFlowMap']['Body'].replace(/&quot;/g, '"'));
			return this.appPagesRoutes[pageFlow['nextPage']];
		}
		return '';
	}

	public static PrevPage(model) {
		if (model['pageFlowMap']) {
			//const pageFlow = JSON.parse(model['pageFlowMap']['Body'].replace(/&quot;/g, '"'));
			const pageFlow=model['pageFlowMap']['Body'];
			return this.appPagesRoutes[pageFlow['prevPage']];
		}
		return '';
	}
}
