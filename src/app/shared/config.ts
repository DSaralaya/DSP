export class AppConfig {

   public static  appPagesRoutes: any = {
    GetStartedPage: 'get-started',
    CrossSellPage: 'cross-sell',
    PersonalInfoPage: 'personal-info',
    EmploymentPage: 'employment',
    IdentityPage: 'identity',
    AccountDetailsPage: 'account-details',
    PurchaseDetailsPage: 'purchase-details',
    PropertyDetailsPage: 'property-details',
    DeclarationsPage: 'declarations',
    ReviewSubmitPage: 'review-submit',
    ConfirmationPage: 'confirmation',
   };

    public static appPageCodes: {
        'ELG': 'EligibilityPage',
        'EP': 'EmploymentPage',
        'SPP': 'StatusPortalPage',
        'SEP': 'SessionExpiredPage',
        'SP': 'SchedulePage',
        'SFL': 'SaveForLaterPage',
        'RS': 'ReviewSubmitPage',
        'PUD': 'PurchaseDetailsPage',
        'PRD': 'PropertyDetailsPage',
        'PI': 'PersonalInfoPage',
        'Index': 'IndexPage',
        'IP': 'IdentityPage',
        'GS': 'GetStartedPage',
        'DeclarationsPage': 'DP',
        'CSP': 'CrossSellPage',
        'CP': 'ConfirmationPage',
        'AppStatusPage': 'AS',
        'AppRetrievalPage': 'AR',
        'AD': 'AccountDetailsPage',
        'DynamicPagesPage': 'DPP',
        'VerifyIdentityPage': 'VI'
    };

   public static GetPageName(model) {
    const pagecode = model['pageCode']['Body'].replace(/&quot;/g, '\"');
     return  this.appPageCodes[pagecode];
   }

   public static NextPage(model) {
     if (model['pageFlowMap']) {
       const pageFlow = JSON.parse(model['pageFlowMap']['Body'].replace(/&quot;/g, '\"'));
       return this.appPagesRoutes[pageFlow['nextPage']];
     }
     return '';
   }


   public static PrevPage(model) {
     if (model['pageFlowMap']) {
      const pageFlow = JSON.parse(model['pageFlowMap']['Body'].replace(/&quot;/g, '\"'));
       return this.appPagesRoutes[pageFlow['prevPage']];
     }
     return '';
   }

   public static CheckDisable(model) {
     if (model && model['pageCode']) {
      const pagecode = model['pageCode']['Body'].replace(/&quot;/g, '\"');
      return pagecode !== 'CSP' ? true : false;
     }
     return false;
  }


}
