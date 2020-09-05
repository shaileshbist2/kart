import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

const WIKI_URL = 'http://localhost:3000/user/typeOnSearch_user';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

@Injectable()
export class UserSampleService {
  constructor(private apiService: ApiService,
              private http: HttpClient) {
  }

  search(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.typeOnSearch_user, {target_val: term || ''});
    // return this.http
    //   .post(WIKI_URL, {target_val: term}).pipe(
    //     map(response => response)
    //   );
  }

  // search(terms: Observable<string>) {
  //   return terms.debounceTime(400)
  // .switchMap(term => this.apiService.executePostMethod(AppConstants.appWriterServiceApi.typeOnSearch_user, {target_val: term || ''}));
  // }
}
