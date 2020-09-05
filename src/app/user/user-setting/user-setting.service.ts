import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';

@Injectable()
export class UserSettingService {
  constructor(private apiService: ApiService) {
  }


  // getSettingInfo_user() {
  //   return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getSettingInfo_user);
  // }

  sendEmailConfirmation_user() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.sendEmailConfirmation_user);
  }


  getCountryList_user() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getCountryList_user);
  }

  getStateList_user(country_code) {
    const requestParam = {
      country_code: country_code
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getStateList_user, requestParam);
  }

  updateProfile_user(settingModel) {
    const requestParam = {
      first_name: settingModel.first_name,
      last_name: settingModel.last_name,
      address: settingModel.address,
      city: settingModel.city,
      country: settingModel.country,
      state: settingModel.state,
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.updateProfile_user, requestParam);
  }

  getProfileDetails_user(){
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getProfileDetails_user);
  }


}
