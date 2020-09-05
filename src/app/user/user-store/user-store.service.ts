import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';
// import {Observable} from "rxjs/Observable";
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap'

@Injectable()
export class UserStoreService {
  constructor(private apiService: ApiService) {
  }

  storeList_user(dataTablesParameters, urlObject) {
    const requestParam = {
      draw: dataTablesParameters.draw,
      start: dataTablesParameters.start,
      length: dataTablesParameters.length,
      search: dataTablesParameters.search,
      url_object: urlObject
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.storeList_user, requestParam);
  }


  countryFilterStore_user(urlObject) {
    const requestParam = {
      url_object: urlObject
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.countryFilterStore_user, requestParam);
  }

  departmentFilterStore_user(urlObject) {
    const requestParam = {
      url_object: urlObject
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.departmentFilterStore_user, requestParam);
  }

  domainFilterStore_user(urlObject) {
    const requestParam = {
      url_object: urlObject
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.domainFilterStore_user, requestParam);
  }

  // setFilterForStore_user(countryString) {
  //   const requestParam = {
  //     country_string: countryString
  //   };
  //   return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.setFilterForStore_user, requestParam);
  // }


}
