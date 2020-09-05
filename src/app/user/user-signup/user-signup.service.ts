import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';

@Injectable()
export class UserSignupService {
  constructor(private apiService: ApiService) {

  }

  signup_user(data) {
    const requestParam = {
      first_name: data.first_name,
      last_name: data.last_name,
      email_id: data.email_id,
      confirm_password: data.confirm_password,
      mobile_number: data.mobile_number,
      finger_print: data.finger_print
    };
    return this.apiService.executePostMethod(AppConstants.appAuthServiceApi.signup_user, requestParam);
  }
}
