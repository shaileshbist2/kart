import {Component, OnInit} from '@angular/core';
import {UserCheckoutService} from './user-checkout.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {UserCheckoutModel} from '../../models/user/userCheckoutModel';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from '../../shared/app.constants';
import {HelperService} from '../../shared/helper.service';

declare var StripeCheckout: any;
declare var $: any;

@Component({
  selector: 'app-user-checkout',
  templateUrl: './user-checkout.component.html',
  styleUrls: ['./user-checkout.component.css']
})
export class UserCheckoutComponent implements OnInit {
  totalNumberOfList: any;
  HELPER: any;
  checkoutModel: any;
  loading = false;
  list_config_id: any;
  amountToPay: any;
  chargeAmount: any;
  chargeAmountInDecimal: any;
  assetsPath: any;
  payBtnView = true;

  constructor(private service: UserCheckoutService,
              private router: Router,
              private authService: AuthService,
              private sessionService: SessionService) {
    this.HELPER = new HelperService();
  }

  /***********************************************************************/
  listModel: any;
  totalPrice = 0;

  getCartListInfo() {
    this.service.getListFromCart_user().subscribe(response => {
      this.totalNumberOfList = response.data[0].listFromCart.length;
      this.listModel = response.data[0].listFromCart;
      this.totalPrice = response.data[0].totalPrice;
      if (this.listModel.length === 0) {
        this.router.navigateByUrl('user/store');
      }
    });
  }

  /***********************************************************************/
  removeList(list_config_id) {
    this.loading = true;
    this.service.removeListFromCart_user(list_config_id).subscribe(response1 => {
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

  /************************** GET TOTAL PRICE ********************************************/

  purchaseListByStripe_user() {
    this.chargeAmount = parseInt(this.totalPrice.toString().replace('.', ''), 10);
    this.chargeAmountInDecimal = this.totalPrice;
    if (!this.authService.isAuthorised()) {
      this.router.navigateByUrl('user/login');
    } else {
      this.amountToPay = this.totalPrice;
      this.handler.open({
        name: 'DataKart',
        description: 'Total Amount is $' + this.totalPrice + '/-',
        amount: this.chargeAmount,
        currency: 'usd'
      });
    }
  }

  handler = StripeCheckout.configure({
    key: AppConstants.stripePublishableKey,
    image: AppConstants.assetsPath + 'images/for_stripe.png',
    locale: 'auto',
    token: token => {
      this.loading = true;
      this.service.purchaseListByStripe_user(token,
        this.chargeAmount, this.chargeAmountInDecimal,
        this.listModel, this.HELPER.getLocalSystemDateTime()).subscribe(response => {
        if (response.data[0].transfer_status === 'succeeded') {
          $('.failedMsg').hide();
          // $('.successMsg').fadeIn(500);
          this.listModel = [];
          this.totalPrice = 0;
          this.payBtnView = false;
          this.router.navigateByUrl('user/purchase-history');
        } else {
          $('.successMsg').hide();
          $('.failedMsg').fadeIn(500);
        }
        this.loading = false;
      });
    }
  });

  ngOnInit() {
    if (!this.authService.isAuthorised()) {
      this.router.navigateByUrl('user/login');
    }
    this.assetsPath = AppConstants.assetsPath;
    this.checkoutModel = new UserCheckoutModel();
    this.getCartListInfo();
  }

}
