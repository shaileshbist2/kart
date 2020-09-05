import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';
import {of} from 'rxjs';
import {AuthService} from '../../shared/auth.service';

@Injectable()
export class UserTechSearchService {
  constructor(private apiService: ApiService, private authService: AuthService) {
  }

  isAuthorized: any;

  dataTableListCompany_user(dataTablesParameters, input_value) {
    this.isAuthorized = this.authService.isAuthorised();
    const requestParam = {
      draw: dataTablesParameters.draw,
      start: dataTablesParameters.start,
      length: dataTablesParameters.length,
      search: dataTablesParameters.search,
      input_value: input_value
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.dataTableListCompany_user, requestParam);
    // if (this.isAuthorized === true) {
    //   return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getSearchDataWithAuth_user, requestParam);
    // } else {
    //   return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getSearchData_user, requestParam);
    // }
  }

}
