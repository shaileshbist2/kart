import {Component, OnInit} from '@angular/core';
import {UserConsultingServiceService} from './user-consulting-service.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from "../../shared/app.constants";
import {HelperService} from "../../shared/helper.service";

declare var StripeCheckout: any;
declare var $: any;

@Component({
  selector: 'app-user-consulting-service',
  templateUrl: './user-consulting-service.component.html',
  styleUrls: ['./user-consulting-service.component.css']
})
export class UserConsultingServiceComponent implements OnInit {
  homeModel: any;
  loader = false;
  public loading = false;
  HELPER: any;

  constructor(private service: UserConsultingServiceService,
              private router: Router,
              private authService: AuthService,
              private sessionService: SessionService) {
    this.HELPER = new HelperService();
    // window.scroll(0, 0);
  }

  chargeAmount: any;
  chargeAmountInDecimal: any;
  selectedCredits: any;
  selectedCreditConfigObj: any;

  continueToPayBtn(amount) {
    $('.successMsg').hide(500);
    $('.failedMsg').hide(500);
    this.chargeAmount = parseInt(amount.toString().replace('.', ''));
    this.chargeAmountInDecimal = amount;
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
      this.service.purchaseServiceByStripe_user(token, this.chargeAmount).subscribe(response => {
        if (response.data[0].transfer_status == 'succeeded') {
          $('.successMsg').show(500);
          $('.failedMsg').hide(500);
        } else {
          $('.successMsg').hide(500);
          $('.failedMsg').show(500);
        }
        this.loading = false;
      });
    }
  });


  assetsPath: any;

  ngOnInit() {
    this.assetsPath = AppConstants.assetsPath;
  }

}
