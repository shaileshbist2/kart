import {Component, OnInit, ViewChild} from '@angular/core';
import {UserPurchaseHistoryService} from './user-purchase-history.service';
import {AuthService} from '../../shared/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
// import {UserListDetailModel} from '../../models/user/userListModel';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from '../../shared/app.constants';
import {HelperService} from '../../shared/helper.service';

declare var $: any;
@Component({
  selector: 'app-user-purchase-history',
  templateUrl: './user-purchase-history.component.html',
  styleUrls: ['./user-purchase-history.component.css']
})
export class UserPurchaseHistoryComponent implements OnInit {
  public loading = false;
  assetsPath: any;
  constructor(private service: UserPurchaseHistoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private sessionService: SessionService) {
    window.scroll(0, 0);
  }

  creditArray = [];
  listArray = [];

  purchaseCredit_user() {
    this.service.purchaseCredit_user().subscribe(response => {
      this.creditArray = response.data;
    });
  }

  purchaseList_user() {
    this.service.purchaseList_user().subscribe(response => {
      this.listArray = response.data;
    });
  }

  ngOnInit() {
    if (!this.authService.isAuthorised()) {
      this.router.navigateByUrl('user/login');
    }
    this.assetsPath = AppConstants.assetsPath;

    this.purchaseCredit_user();
    this.purchaseList_user();

  }
}
