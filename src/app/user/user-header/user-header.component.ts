import {Component, OnInit, Input} from '@angular/core';
import {UserHeaderService} from './user-header.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from '../../shared/app.constants';
import {CreditsDetailsModel} from '../../models/user/userHeaderModel';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead/typeahead-match.class';
import {Subject} from 'rxjs/Subject';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  loading = false;
  inputValue: any;
  peopleSearchList: Array<string> = [];
  selectedValue: string;
  route1 = '/user/people-search';
  route2 = '/';
  route3 = '/user/lead-search';
  route4 = '/user/tech-search';
  currentRoute = this.router.url;
  isAuthorized: any;
  isSearchObjExist: any;
  firstName: any;
  lastName: any;
  assetsPath: any;
  listModel: any;
  searching = false;
  searchFailed = false;
  model: any;

  @Input() totalNumberOfList: any;
  @Input() creditsDetails: any;
  results: Object;
  searchTerm$ = new Subject<string>();

  constructor(private authService: AuthService,
              private router: Router,
              private sessionService: SessionService,
              private service: UserHeaderService
  ) {
    // this.service.search(this.searchTerm$).subscribe(response => {
    //   this.peopleSearchList = response.data[0].mergeObject;
    //   setTimeout(() => {
    //     this.loading = false;
    //   }, 900);
    // });

    /***************************************************/
    this.sessionService.addItem('last_route', router.url);
  }

  /********************************************************************************/
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(400),
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

  logoutAccount() {
    this.authService.logout();
    localStorage.setItem('logout-event', 'logout' + Math.random());
    this.router.navigateByUrl('user/login');
  }


  /***********************************************************************/

  // getCartListInfo() {
  //   this.listModel = this.sessionService.getItem('addListToCart') || [];
  // }

  onSelectSearch(event: TypeaheadMatch): void {
    this.inputValue = event.item;
    this.sessionService.addItem('searchObject', this.inputValue);
    this.router.navigateByUrl('user/people-search');
  }

  /*********************************************************************/
  getCartListInfo() {
    if (this.totalNumberOfList === undefined) {
      this.service.getListFromCart_user().subscribe(response => {
        this.totalNumberOfList = response.data[0].listFromCart.length;
      });
    }
  }


  /************ GET CREDITS STATUS *******************************************/
  getCreditsStatus_user() {
    this.service.getCreditsStatus_user().subscribe(response => {
      this.creditsDetails = response.data[0].creditsDetails[0];
    });
  }

  /**************************************************************************/

  ngOnInit() {
    this.assetsPath = AppConstants.assetsPath;
    this.isSearchObjExist = this.sessionService.getItem('searchObject'); // null
    this.isAuthorized = this.authService.isAuthorised(); // true or false
    this.firstName = this.authService.userClaim.firstName;
    this.lastName = this.authService.userClaim.lastName;
    this.getCartListInfo();

    this.authService.logoutEvent();
    this.authService.loginEvent();

    this.creditsDetails = new CreditsDetailsModel();
    this.getCreditsStatus_user();
    /**************************************************************************************************/
    $(document).ready(function () {

      'use strict';

      /***** Quick Stats *****/
      $('.open-hide-menu').on('click', function () {
        $('.horizontal-menu > nav').slideToggle('active');
      });

      /***** Quick Stats *****/
      $('.show-stats').on('click', function () {
        $('.toggle-content').addClass('active');
      });

      /***** Quick Stats *****/
      $('.toggle-content > span').on('click', function () {
        $('.toggle-content').removeClass('active');
      });

      /***** Quick Stats *****/
      $('.quick-links > ul > li > a').on('click', function () {
        $(this).parent().siblings().find('.dialouge').fadeOut();
        $(this).next('.dialouge').fadeIn();
        return false;
      });

      $('html').on('click', function () {
        $('.dialouge').fadeOut();
      });
      $('.quick-links > ul > li > a, .dialouge').on('click', function (e) {
        e.stopPropagation();
      });
      $('.data-attributes span').peity('donut');
    });
    /**************************************************************************************************/
  }
}
