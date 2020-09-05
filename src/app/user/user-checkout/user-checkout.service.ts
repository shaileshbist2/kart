import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';

@Injectable()
export class UserCheckoutService {
  constructor(private apiService: ApiService) {
  }

  purchaseListByStripe_user(token, charge_amount, charge_amount_in_decimal, list_model, client_date) {
    const requestParam = {
      token: token,
      charge_amount: charge_amount,
      charge_amount_in_decimal: charge_amount_in_decimal.toString(),
      list_model: list_model,
      client_date: client_date
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.purchaseListByStripe_user, requestParam);
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
