import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AuthService} from '../../shared/auth.service';
import {AppConstants} from '../../shared/app.constants';
import {of} from 'rxjs';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';
// import {map} from 'rxjs/operators';

@Injectable()
export class UserPeopleSearchService {
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

  peopleList_user(dataTablesParameters, filterObject) {
    this.isAuthorized = this.authService.isAuthorised();
    const requestParam = {
      draw: dataTablesParameters.draw,
      start: dataTablesParameters.start,
      length: dataTablesParameters.length,
      search: dataTablesParameters.search,
      filter_object: filterObject
    };
    if (this.isAuthorized === true) {
      return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.searchOutputListWithAuth_user, requestParam);
    } else {
      return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.searchOutputList_user, requestParam);
    }
  }

  setCountryToFilter_user(filterObject) {
    const requestParam = {
      filter_object: filterObject
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.setCountryToFilter_user, requestParam);
  }

  setStateToFilter_user(filterObject) {
    const requestParam = {
      filter_object: filterObject
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.setStateToFilter_user, requestParam);
  }

  setLevelToFilter_user(filterObject) {
    const requestParam = {
      filter_object: filterObject
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.setLevelToFilter_user, requestParam);
  }

  setDepartmentToFilter_user(filterObject) {
    const requestParam = {
      filter_object: filterObject
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.setDepartmentToFilter_user, requestParam);
  }

  setIndustryToFilter_user(filterObject) {
    const requestParam = {
      filter_object: filterObject
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.setIndustryToFilter_user, requestParam);
  }


  search(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.typeOnSearch_user, {target_val: term || ''});
  }
}
