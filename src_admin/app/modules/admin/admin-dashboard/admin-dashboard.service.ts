import {Injectable} from '@angular/core';
import {AppConstants} from '../../../shared/app.constants';
import {ApiService} from '../../../shared/api.service';

@Injectable()
export class AdminDashboardService {

  constructor(private apiService: ApiService) {
  }

  getDashboardDetails_a() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getDashboardDetails_a);
  }
}
