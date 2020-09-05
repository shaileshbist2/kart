import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';

@Injectable()
export class UserForgotPasswordService {
  constructor(private apiService: ApiService) {
  }

  emailOTPResetPass_user(email_id) {
    const requestParam = {
      email_id: email_id
    };
    return this.apiService.executePostMethod(AppConstants.appAuthServiceApi.emailOTPResetPass_user, requestParam);
  }

  resetPassword_user(forgotPasswordModel) {
    const requestParam = {
      email_id: forgotPasswordModel.email_id,
      otp: forgotPasswordModel.otp,
      confirm_password: forgotPasswordModel.confirm_password
    };
    return this.apiService.executePostMethod(AppConstants.appAuthServiceApi.resetPassword_user, requestParam);
  }
}
