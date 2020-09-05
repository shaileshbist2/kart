import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';

@Injectable()
export class UserConfirmEmailService {
  constructor(private apiService: ApiService) {
  }


  verifyEmail_user(login_token, email_id) {
    const requestParam = {
      login_token: login_token,
      email_id: email_id
    };
    return this.apiService.executePostMethod(AppConstants.appAuthServiceApi.verifyEmail_user, requestParam);
  }


}
