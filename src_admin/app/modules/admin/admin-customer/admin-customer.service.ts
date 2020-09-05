import {Injectable} from '@angular/core';
import {AppConstants} from '../../../shared/app.constants';
import {ApiService} from '../../../shared/api.service';

@Injectable()
export class AdminCustomerService {

  constructor(private apiService: ApiService) {
  }

  userList_a(dataTablesParameters) {
    const requestParam = {
      draw: dataTablesParameters.draw,
      start: dataTablesParameters.start,
      length: dataTablesParameters.length,
      search: dataTablesParameters.search
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.userList_a, requestParam);
  }

  getUserDetail_a(user_id) {
    const requestParam = {
      user_id: user_id
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getUserDetail_a, requestParam);
  }

  createUser_a(userModel) {
    const requestParam = {
      userModel: userModel
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.createUser_a, requestParam);
  }

  updateUser_a(userModel) {
    const requestParam = {
      userModel: userModel
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.updateUser_a, requestParam);
  }
}
