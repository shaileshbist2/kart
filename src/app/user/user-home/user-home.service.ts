import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';
import {of} from 'rxjs';
// import {map} from 'rxjs/operators';

@Injectable()
export class UserHomeService {
  constructor(private apiService: ApiService) {
  }

  search(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.typeOnSearch_user, {target_val: term || ''});
  }

  // search(terms: Observable<string>) {
  //   return terms.debounceTime(400)
  // .switchMap(term => this.apiService.executePostMethod(AppConstants.appWriterServiceApi.typeOnSearch_user, {target_val: term || ''}));
  // }

  storeListForHome_user() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.storeListForHome_user);
  }

  getSearchTags_user() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getSearchTags_user);
  }

  getCreditConfig_user() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getCreditConfig_user);
  }

  subscribeNow_user(subscriber_email) {
    const requestParam = {
      subscriber_email: subscriber_email
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.subscribeNow_user, requestParam);
  }

  submitContactForm_user(contactModel) {
    const requestParam = {
      contact_model: contactModel
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.submitContactForm_user, requestParam);
  }
}
