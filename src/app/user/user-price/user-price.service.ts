import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';

@Injectable()
export class UserPriceService {
  constructor(private apiService: ApiService) {
  }

  getCreditConfig_user() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getCreditConfig_user);
  }

  purchaseCreditByStripe_user(token, charge_amount, charge_amount_in_decimal, selected_credits, selected_credit_config_obj, client_date) {
    const requestParam = {
      token: token,
      charge_amount: charge_amount,
      charge_amount_in_decimal: charge_amount_in_decimal.toString(),
      selected_credits: selected_credits,
      selected_credit_config_obj: selected_credit_config_obj,
      client_date: client_date
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.purchaseCreditByStripe_user, requestParam);
  }
}
