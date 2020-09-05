import {Component, OnInit} from '@angular/core';
import {UserSampleService} from './user-sample.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {UserHomeModel, UserSubscribeModel, ContactModel} from '../../models/user/userHomeModel';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from '../../shared/app.constants';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead/typeahead-match.class';
import {Subject} from 'rxjs/Subject';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-user-sample',
  templateUrl: './user-sample.component.html',
  styleUrls: ['./user-sample.component.css']
})
export class UserSampleComponent implements OnInit {
  model: any;
  searching = false;
  searchFailed = false;
  click$ = new Subject<string>();

  constructor(private service: UserSampleService,
              private router: Router,
              private authService: AuthService,
              private sessionService: SessionService) {
  }

  selectItem(model) {
    console.log(model);
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.service.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )
  formatter = (x: { name: string }) => x.name;

  /******************************************************************************/
  ngOnInit() {
  }
}
