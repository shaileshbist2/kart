export class AppConstants {

  /************ PRODUCTION SERVER ********************************************************/
  // public static assetsPath = window.location.origin + '/assets/';
  // public static apiBaseUrlUser = window.location.origin + '/user/';
  // public static stripePublishableKey = 'pk_live_QU3H09TUIDaoqsbN95cZuTiv';

  /************ DEVELOPMENT / UAT SERVER *************************************************/
  // public static assetsPath = window.location.origin + '/assets/';
  // public static apiBaseUrlUser = window.location.origin + '/user/';
  // public static stripePublishableKey = 'pk_test_mdRXDzsbYLr5KojfYFzzpsI2';

  /************ DEVELOPMENT WITH PRODUCTION *************************************************/
  // public static assetsPath = 'https://datakart.io/user/assets/';
  // public static apiBaseUrlUser = 'https://datakart.io/user/';
  // public static stripePublishableKey = 'pk_test_mdRXDzsbYLr5KojfYFzzpsI2';

  /************ LOCAL *******************************************************************/
  public static assetsPath = 'http://localhost:3000/assets/';
  public static apiBaseUrlUser = 'http://localhost:3000/user/';
  public static stripePublishableKey = 'pk_test_mdRXDzsbYLr5KojfYFzzpsI2';

  /**************************************************************************************/
  public static appAuthServiceApi = {
    login_user: AppConstants.apiBaseUrlUser + 'login_user',
    signup_user: AppConstants.apiBaseUrlUser + 'signup_user',
    verifyEmail_user: AppConstants.apiBaseUrlUser + 'verifyEmail_user',
    emailOTPResetPass_user: AppConstants.apiBaseUrlUser + 'emailOTPResetPass_user',
    resetPassword_user: AppConstants.apiBaseUrlUser + 'resetPassword_user',
  };
  public static appReaderServiceApi = {
    getCountryList_user: AppConstants.apiBaseUrlUser + 'getCountryList_user',
  };
  public static appWriterServiceApi = {
    purchaseCredit_user: AppConstants.apiBaseUrlUser + 'purchaseCredit_user',
    purchaseList_user: AppConstants.apiBaseUrlUser + 'purchaseList_user',
    getSearchTags_user: AppConstants.apiBaseUrlUser + 'getSearchTags_user',
    submitContactForm_user: AppConstants.apiBaseUrlUser + 'submitContactForm_user',
    storeListForHome_user: AppConstants.apiBaseUrlUser + 'storeListForHome_user',
    getEmailProviderList: AppConstants.apiBaseUrlUser + 'getEmailProviderList',
    peopleList_user: AppConstants.apiBaseUrlUser + 'peopleList_user',
    dataTableListCompany_user: AppConstants.apiBaseUrlUser + 'dataTableListCompany_user',
    getSearchData_user: AppConstants.apiBaseUrlUser + 'getSearchData_user',
    getSearchDataWithAuth_user: AppConstants.apiBaseUrlUser + 'getSearchDataWithAuth_user',
    typeOnSearch_user: AppConstants.apiBaseUrlUser + 'typeOnSearch_user',
    setFilterData_user: AppConstants.apiBaseUrlUser + 'setFilterData_user',
    purchaseSelectedContacts_user: AppConstants.apiBaseUrlUser + 'purchaseSelectedContacts_user',
    getManagementLevelAndRevenue_user: AppConstants.apiBaseUrlUser + 'getManagementLevelAndRevenue_user',
    getCreditsStatus_user: AppConstants.apiBaseUrlUser + 'getCreditsStatus_user',
    isContactPurchased_user: AppConstants.apiBaseUrlUser + 'isContactPurchased_user',
    purchaseContactNow_user: AppConstants.apiBaseUrlUser + 'purchaseContactNow_user',
    getCreditConfig_user: AppConstants.apiBaseUrlUser + 'getCreditConfig_user',
    subscribeNow_user: AppConstants.apiBaseUrlUser + 'subscribeNow_user',
    purchaseServiceByStripe_user: AppConstants.apiBaseUrlUser + 'purchaseServiceByStripe_user',
    purchaseCreditByStripe_user: AppConstants.apiBaseUrlUser + 'purchaseCreditByStripe_user',
    purchasedList_user: AppConstants.apiBaseUrlUser + 'purchasedList_user',
    contactHistory_user: AppConstants.apiBaseUrlUser + 'contactHistory_user',
    emailSelectedContacts_user: AppConstants.apiBaseUrlUser + 'emailSelectedContacts_user',
    sendEmailConfirmation_user: AppConstants.apiBaseUrlUser + 'sendEmailConfirmation_user',
    getCountryList_user: AppConstants.apiBaseUrlUser + 'getCountryList_user',
    getStateList_user: AppConstants.apiBaseUrlUser + 'getStateList_user',
    updateProfile_user: AppConstants.apiBaseUrlUser + 'updateProfile_user',
    getProfileDetails_user: AppConstants.apiBaseUrlUser + 'getProfileDetails_user',
    storeList_user: AppConstants.apiBaseUrlUser + 'storeList_user',
    countryFilterStore_user: AppConstants.apiBaseUrlUser + 'countryFilterStore_user',
    departmentFilterStore_user: AppConstants.apiBaseUrlUser + 'departmentFilterStore_user',
    domainFilterStore_user: AppConstants.apiBaseUrlUser + 'domainFilterStore_user',
    getListConfigDetail_user: AppConstants.apiBaseUrlUser + 'getListConfigDetail_user',
    addListToCart_user: AppConstants.apiBaseUrlUser + 'addListToCart_user',
    removeListFromCart_user: AppConstants.apiBaseUrlUser + 'removeListFromCart_user',
    getListFromCart_user: AppConstants.apiBaseUrlUser + 'getListFromCart_user',
    purchaseListByStripe_user: AppConstants.apiBaseUrlUser + 'purchaseListByStripe_user',

    searchOutputListWithAuth_user: AppConstants.apiBaseUrlUser + 'searchOutputListWithAuth_user',
    searchOutputList_user: AppConstants.apiBaseUrlUser + 'searchOutputList_user',
    setCountryToFilter_user: AppConstants.apiBaseUrlUser + 'setCountryToFilter_user',
    setStateToFilter_user: AppConstants.apiBaseUrlUser + 'setStateToFilter_user',
    setLevelToFilter_user: AppConstants.apiBaseUrlUser + 'setLevelToFilter_user',
    setDepartmentToFilter_user: AppConstants.apiBaseUrlUser + 'setDepartmentToFilter_user',
    setIndustryToFilter_user: AppConstants.apiBaseUrlUser + 'setIndustryToFilter_user',
  };
}
