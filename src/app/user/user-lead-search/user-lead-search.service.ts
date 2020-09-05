import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AuthService} from '../../shared/auth.service';
import {AppConstants} from '../../shared/app.constants';
import {of} from 'rxjs';

@Injectable()
export class UserLeadSearchService {
  constructor(private apiService: ApiService, private authService: AuthService) {
  }

  isAuthorized: any;

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

  getCreditsStatus_user() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getCreditsStatus_user);
  }

  dataTableList_user(dataTablesParameters, input_value, selected_filter_obj, searching_by) {
    this.isAuthorized = this.authService.isAuthorised();
    const requestParam = {
      draw: dataTablesParameters.draw,
      start: dataTablesParameters.start,
      length: dataTablesParameters.length,
      search: dataTablesParameters.search,
      input_value: input_value,
      selected_filter_obj: selected_filter_obj,
      searching_by: searching_by
    };
    if (this.isAuthorized === true) {
      return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getSearchDataWithAuth_user, requestParam);
    } else {
      return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getSearchData_user, requestParam);
    }
  }

  getSearchData_user(term: string) {
    if (term === '') {
      return of([]);
    }
    const requestParam = {
      target_val: term || ''
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getSearchData_user, requestParam);
  }

  search(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.typeOnSearch_user, {target_val: term || ''});
  }

  setFilterData_user(super_obj) {
    const requestParam = {
      super_obj: super_obj
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.setFilterData_user, requestParam);
  }

  purchaseSelectedContacts_user(data_set) {
    const requestParam = {
      data_set: data_set
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.purchaseSelectedContacts_user, requestParam);
  }

  getManagementLevelAndRevenue_user() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getManagementLevelAndRevenue_user);
  }
}
