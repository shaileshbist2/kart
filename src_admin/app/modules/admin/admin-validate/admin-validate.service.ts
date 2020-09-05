import {Injectable} from '@angular/core';
import {AppConstants} from '../../../shared/app.constants';
import {ApiService} from '../../../shared/api.service';

@Injectable()
export class AdminValidateService {

  constructor(private apiService: ApiService) {
  }

  getDashboardDetails_a() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getDashboardDetails_a);
  }

  startEmailValidateProcess_a(validate) {
    const requestParam = {
      validate: validate
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.startEmailValidateProcess_a, requestParam);
  }

  startEmailValidateCommaSeparatedProcess_a(comma_separated_emails) {
    const requestParam = {
      comma_separated_emails: comma_separated_emails
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.startEmailValidateCommaSeparatedProcess_a, requestParam);
  }
}
