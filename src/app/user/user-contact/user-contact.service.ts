import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';

@Injectable()
export class UserContactService {
  constructor(private apiService: ApiService) {
  }

  isContactPurchased_user(peopleDataId) {
    const requestParam = {
      people_data_id: peopleDataId
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.isContactPurchased_user, requestParam);
  }

  purchaseContactNow_user(peopleDataId) {
    const requestParam = {
      people_data_id: peopleDataId,
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.purchaseContactNow_user, requestParam);
  }

  // typeOnSearchPeopleCompany_user(targetVal) {
  //   const requestParam = {
  //     target_val: targetVal
  //   };
  //   return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.typeOnSearchPeopleCompany_user, requestParam);
  // }

  getCreditsStatus_user() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getCreditsStatus_user);
  }
}
