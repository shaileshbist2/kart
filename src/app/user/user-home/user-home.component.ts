import {Component, OnInit} from '@angular/core';
import {UserHomeService} from './user-home.service';
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
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  homeModel: any;
  public loading = false;
  inputValue: any;
  peopleSearchList: Array<string> = [];
  searchTerm$ = new Subject<string>();
  selectedValue: string;
  contactModel: any;

  constructor(private service: UserHomeService,
              private router: Router,
              private authService: AuthService,
              private sessionService: SessionService) {
    // this.service.search(this.searchTerm$).subscribe(response => {
    //   this.peopleSearchList = response.data[0].mergeObject;
    //   setTimeout(() => {
    //     this.loading = false;
    //   }, 900);
    // });
  }

  subscribeModel: any;
  storeList: any;
  storeList2: any;
  tags: any;
  creditList = [];
  assetsPath: any;
  isAuth: any;
  searching = false;
  searchFailed = false;
  model: any;
  /********************************************************************************/
  onSelectSearch(event: TypeaheadMatch): void {
    this.inputValue = event.item;
    this.sessionService.addItem('searchObject', this.inputValue);
    this.router.navigateByUrl('user/people-search');
  }

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

  storeListForHome_user() {
    this.service.storeListForHome_user().subscribe(response => {
      this.storeList = response.data[0].store_list;
      this.storeList2 = response.data[0].store_list2;
    });
  }


  getSearchTags_user() {
    this.service.getSearchTags_user().subscribe(response => {
      this.tags = response.data[0].tags;
    });
  }

  clickTag(tag) {
    this.sessionService.addItem('searchObject', tag);
    this.router.navigateByUrl('user/people-search');
  }

  getCreditConfig_user() {
    this.service.getCreditConfig_user().subscribe(response => {
      this.creditList = response.data[0].creditList;
    });
  }

  subscribeNow_user() {
    if (this.subscribeModel.subscriber_email) {
      this.service.subscribeNow_user(this.subscribeModel.subscriber_email).subscribe(response => {
        if (response.data[0] === true) {
          $('.sub_success_msg').fadeIn(1000).fadeOut(1000);
          this.subscribeModel.subscriber_email = null;
        } else {
          $('.sub_success_msg').fadeOut(500);
        }
      });
    }
  }


  submitContactForm(contactModel) {
    this.service.submitContactForm_user(contactModel).subscribe(response => {
      if (response.message === 'success') {
        this.contactModel.contact_full_name = null;
        this.contactModel.contact_email_id = null;
        this.contactModel.contact_phone = null;
        this.contactModel.contact_subject = null;
        this.contactModel.contact_message = null;
        $('.successContactMsg').fadeIn(500);
      } else {
        $('.successContactMsg').fadeOut(500);
      }
    });
  }

  ngOnInit() {
    this.isAuth = this.authService.isAuthorised();
    this.assetsPath = AppConstants.assetsPath;
    this.homeModel = new UserHomeModel();
    this.subscribeModel = new UserSubscribeModel();
    this.storeListForHome_user();
    this.getSearchTags_user();
    this.getCreditConfig_user();
    this.contactModel = new ContactModel();

    var height;
    var available;
    var percentage_of_page;
    var half_screen;

    function write_status() {
      // Document minus Viewport
      // https://stackoverflow.com/a/1304384/1287812
      // available = $(document).height() - $(window).height();
      available = $(document).height();
      percentage_of_page = 0.09;
      half_screen = available * percentage_of_page;
      $('#scroll-val').html(height + '/' + available + ' - Show at: ' + half_screen);
    }

    $(window).scroll(function (e) {
      height = $(window).scrollTop();
      write_status();
      if (height > half_screen) {
        $('.box').show();
      } else {
        $('.box').hide();
      }
    });

    $('.contact-us').click(function () {
      $('html,body').animate(
        {
          scrollTop: $('.contact_scroll').offset().top
        }, 'slow');
    });
  }
}
