import {Component, OnInit, ViewChild} from '@angular/core';
import {UserListService} from './user-list.service';
import {AuthService} from '../../shared/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {UserListDetailModel} from '../../models/user/userListModel';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from '../../shared/app.constants';
import {HelperService} from '../../shared/helper.service';
import {Location} from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  totalNumberOfList: any;
  listDetailModel: any;
  list_config_id: any;
  HELPER: any;
  public loading = false;
  assetsPath: any;
  addListToCartBtn = false;
  listAddedMsg = false;
  listModel: any;
  totalPrice: any;
  isAuthorized: any;
  loginBtn = true;

  constructor(private service: UserListService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private sessionService: SessionService,
              private location: Location) {
    window.scroll(0, 0);
    this.list_config_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getListConfigDetail_user(this.list_config_id);
  }


  getListConfigDetail_user(list_config_id) {
    this.loading = true;
    this.service.getListConfigDetail_user(list_config_id).subscribe(response => {
      this.listDetailModel = response.data[0];
      this.loading = false;
    });
  }


  addListToCart(listDetailModel) {
    if (this.isAuthorized === true) {
      this.loading = true;
      this.service.getListFromCart_user().subscribe(response => {
        const cartObj = response.data[0].listFromCart;
        if (cartObj.length !== 0) {
          listDetailModel['client_date'] = this.HELPER.getLocalSystemDateTime();
          cartObj.push(listDetailModel);
          this.service.addListToCart_user(cartObj).subscribe(response1 => {
            this.isCartListExists();
            this.getCartListInfo();
            this.loading = false;
          });
        } else {
          listDetailModel['client_date'] = this.HELPER.getLocalSystemDateTime();
          const cartObj2 = [listDetailModel];
          this.service.addListToCart_user(cartObj2).subscribe(response2 => {
            setTimeout(() => {
              this.isCartListExists();
              this.getCartListInfo();
              this.loading = false;
            }, 100);
          });
        }
      });
    } else {
      this.router.navigateByUrl('user/login');
    }
  }

  backToList() {
    this.location.back();
  }

  isCartListExists() {
    this.service.getListFromCart_user().subscribe(response => {
      const cartListObj = response.data[0].listFromCart;
      if (cartListObj !== null) {
        if (cartListObj.length !== 0) {
          for (const data of cartListObj) {
            const list_config_id = data.list_config_id;
            if (this.list_config_id === data.list_config_id) {
              this.listAddedMsg = data.list_config_id;
              this.addListToCartBtn = false;
              return false;
            } else {
              this.addListToCartBtn = this.list_config_id;
              this.listAddedMsg = false;
            }
          }
        } else {
          this.addListToCartBtn = this.list_config_id;
          this.listAddedMsg = false;
        }
      } else {
        this.addListToCartBtn = this.list_config_id;
        this.listAddedMsg = false;
      }
    });
  }


  /***********************************************************************/

  getCartListInfo() {
    this.service.getListFromCart_user().subscribe(response => {
      this.totalNumberOfList = response.data[0].listFromCart.length;
      this.listModel = response.data[0].listFromCart;
      this.totalPrice = response.data[0].totalPrice;
    });
  }

  /***********************************************************************/
  removeList(list_config_id) {
    this.loading = true;
    this.service.removeListFromCart_user(list_config_id).subscribe(response1 => {
      this.isCartListExists();
      this.service.getListFromCart_user().subscribe(response => {
        this.totalNumberOfList = response.data[0].listFromCart.length;
        this.listModel = response.data[0].listFromCart;
        this.totalPrice = response.data[0].totalPrice;
        if (this.listModel.length === 0) {
          this.router.navigateByUrl('user/store');
        }
        this.loading = false;
      });
    });
  }

  ngOnInit() {
    this.isAuthorized = this.authService.isAuthorised();
    this.assetsPath = AppConstants.assetsPath;
    this.HELPER = new HelperService();
    this.listDetailModel = new UserListDetailModel();
    this.isCartListExists();

    if (this.isAuthorized === true) {
      this.loginBtn = false;
    }

    $(document).ready(function () {
      $('.owl-carousel').owlCarousel({
        stagePadding: 50,
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 3
          },
          1000: {
            items: 5
          }
        }
      });
    });
  }
}
