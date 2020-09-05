import {Component, OnInit} from '@angular/core';
import {UserPriceService} from './user-price.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {UserPriceModel} from '../../models/user/userPriceModel';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from '../../shared/app.constants';
import {HelperService} from '../../shared/helper.service';

declare var $: any;
declare var StripeCheckout: any;

@Component({
  selector: 'app-user-price',
  templateUrl: './user-price.component.html',
  styleUrls: ['./user-price.component.css']
})
export class UserPriceComponent implements OnInit {
  HELPER: any;
  priceModel: any;
  public loading = false;

  constructor(private service: UserPriceService,
              private router: Router,
              private authService: AuthService,
              private sessionService: SessionService) {
    this.HELPER = new HelperService();
  }


  /*********** GET PRICE LIST ***************************************************/
  creditList: any;
  publishableKey: string;

  getCreditConfig_user() {
    this.service.getCreditConfig_user().subscribe(response => {
      this.creditList = response.data[0].creditList;
    });
  }

  /******************************************************************************/

  /************* STRIPE INTEGRATION ********************************************/
  chargeAmount: any;
  chargeAmountInDecimal: any;
  selectedCredits: any;
  selectedCreditConfigObj: any;

  continueToPayBtn(amount, credits, jsonData) {
    this.chargeAmount = parseInt(amount.toString().replace('.', ''));
    this.chargeAmountInDecimal = amount;
    this.selectedCredits = credits;
    this.selectedCreditConfigObj = jsonData;
    this.handler.open({
      name: 'DataKart',
      description: '',
      amount: this.chargeAmount,
      currency: 'usd'
    });
  }

  handler = StripeCheckout.configure({
    key: AppConstants.stripePublishableKey,
    image: AppConstants.assetsPath + 'images/for_stripe.png',
    locale: 'auto',
    token: token => {
      this.loading = true;
      this.service.purchaseCreditByStripe_user(token,
        this.chargeAmount,
        this.chargeAmountInDecimal,
        this.selectedCredits,
        this.selectedCreditConfigObj,
        this.HELPER.getLocalSystemDateTime()).subscribe(response => {
        if (response.data[0].transfer_status == 'succeeded') {
          this.router.navigateByUrl('user/people-search');
        } else {
          alert('Payment failed!');
        }
        this.loading = false;
      });
    }
  });

  ngOnInit() {
    if (!this.authService.isAuthorised()) {
      this.router.navigateByUrl('user/login');
    }
    this.getCreditConfig_user();
    this.priceModel = new UserPriceModel();
  }

}
