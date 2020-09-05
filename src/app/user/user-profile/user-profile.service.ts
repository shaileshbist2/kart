import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';

@Injectable()
export class UserProfileService {
  constructor(private apiService: ApiService) {
  }

  getCountryList_user() {
    return this.apiService.executePostMethod(AppConstants.appReaderServiceApi.getCountryList_user);
  }
}
