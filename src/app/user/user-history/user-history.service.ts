import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap'
// import {Observable} from "rxjs/Observable";
@Injectable()
export class UserHistoryService {
  constructor(private apiService: ApiService) {
  }

  // creditFilter_user() {
  //   return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.creditFilter_user);
  // }

  purchasedList_user() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.purchasedList_user);
  }

  contactHistory_user(dataTablesParameters, filter_type, list_array) {
    const requestParam = {
      draw: dataTablesParameters.draw,
      start: dataTablesParameters.start,
      length: dataTablesParameters.length,
      search: dataTablesParameters.search,
      filter_type: filter_type,
      list_array: list_array
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.contactHistory_user, requestParam);
  }

  emailSelectedContacts_user(dataSet) {
    const requestParam = {
      data_set: dataSet
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.emailSelectedContacts_user, requestParam);
  }
}
