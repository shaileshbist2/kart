import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';
import {of} from 'rxjs';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';

@Injectable()
export class UserHeaderService {
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
  // .switchMap(term => this.apiService.executePostMethod(AppConstants.appWriterServiceApi.typeOnSearch_user, {target_val: term || '' }));
  // }

  getListFromCart_user() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getListFromCart_user);
  }


  // typeOnSearchPeopleCompany_user(targetVal): Observable<any> {
  //   const requestParam = {
  //     target_val: targetVal
  //   };
  //   return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.typeOnSearchPeopleCompany_user, requestParam);
  // }

  getCreditsStatus_user() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getCreditsStatus_user);
  }

}
