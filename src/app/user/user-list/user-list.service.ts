import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';

@Injectable()
export class UserListService {
  constructor(private apiService: ApiService) {
  }

  getListConfigDetail_user(list_config_id) {
    const requestParam = {
      list_config_id: list_config_id
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getListConfigDetail_user, requestParam);
  }

  addListToCart_user(cartObj) {
    const requestParam = {
      cartObj: cartObj
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.addListToCart_user, requestParam);
  }

  removeListFromCart_user(list_config_id) {
    const requestParam = {
      list_config_id: list_config_id
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.removeListFromCart_user, requestParam);
  }

  getListFromCart_user() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getListFromCart_user);
  }
}
