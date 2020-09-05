import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';

@Injectable()
export class UserPurchaseHistoryService {
  constructor(private apiService: ApiService) {
  }

  // getListConfigDetail_user(list_config_id) {
  //   const requestParam = {
  //     list_config_id: list_config_id
  //   };
  //   return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getListConfigDetail_user, requestParam);
  // }
  //
  purchaseCredit_user() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.purchaseCredit_user);
  }

  purchaseList_user() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.purchaseList_user);
  }
}
