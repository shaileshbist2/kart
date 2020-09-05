import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';
@Injectable()
export class UserConsultingServiceService {
    constructor(private apiService: ApiService) {
    }

  purchaseServiceByStripe_user(token, charge_amount) {
    const requestParam = {
      token: token,
      charge_amount: charge_amount
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.purchaseServiceByStripe_user, requestParam);
  }

}
