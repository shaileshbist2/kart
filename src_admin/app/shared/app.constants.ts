export class AppConstants {
  /******************** PRODUCTION ********************************************/
  // public static apiBaseUrl = 'https://datakart.io/admin/';
  // public static assetsPath = 'https://datakart.io/assets/';
  /******************** UAT DEVELOPMENT ********************************************/
  // public static apiBaseUrl = 'http://18.224.211.222/admin/';
  // public static assetsPath = 'http://18.224.211.222/assets/';
  /******************** LOCAL ********************************************/
  public static apiBaseUrl = 'http://localhost:3000/admin/';
  public static assetsPath = 'http://localhost:3000/assets/';

  public static appId = 1;
  public static appAuthServiceApi = {
    login: AppConstants.apiBaseUrl + 'login'
  };
  public static appReaderServiceApi = {
    saveField_a: AppConstants.apiBaseUrl + 'saveField_a',
  };
  public static appWriterServiceApi = {
    getDashboardDetails_a: AppConstants.apiBaseUrl + 'getDashboardDetails_a',
    startEmailValidateProcess_a: AppConstants.apiBaseUrl + 'startEmailValidateProcess_a',
    startEmailValidateCommaSeparatedProcess_a: AppConstants.apiBaseUrl + 'startEmailValidateCommaSeparatedProcess_a',
    addNewField_a: AppConstants.apiBaseUrl + 'addNewField_a',
    createUpdatePeopleData_a: AppConstants.apiBaseUrl + 'createUpdatePeopleData_a',
    showContactDetails_a: AppConstants.apiBaseUrl + 'showContactDetails_a',
    validateSelectedEmails_a: AppConstants.apiBaseUrl + 'validateSelectedEmails_a',
    getAllColumns_a: AppConstants.apiBaseUrl + 'getAllColumns_a',
    getDetails_a: AppConstants.apiBaseUrl + 'getDetails_a',
    peopleList_a: AppConstants.apiBaseUrl + 'peopleList_a',
    checkInputValue_a: AppConstants.apiBaseUrl + 'checkInputValue_a',
    userList_a: AppConstants.apiBaseUrl + 'userList_a',
    getUserDetail_a: AppConstants.apiBaseUrl + 'getUserDetail_a',
    createUser_a: AppConstants.apiBaseUrl + 'createUser_a',
    updateUser_a: AppConstants.apiBaseUrl + 'updateUser_a',
  };
  public static redirectPageUrl = {
    loginPage: '/login'
  };
}
