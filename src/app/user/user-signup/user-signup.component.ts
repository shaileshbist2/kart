import {Component, OnInit} from '@angular/core';
import {UserSignupService} from './user-signup.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {UserSignupModel} from '../../models/user/userSignupModel';
import {AppConstants} from '../../shared/app.constants';
import {SessionService} from '../../shared/session.service';

declare var FingerPrintJS: any;
declare var $: any;

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  signupModel: any;
  errorMsg: any;
  loading: any;

  constructor(private service: UserSignupService,
              private router: Router,
              private authService: AuthService,
              private sessionService: SessionService) {
  }

  signup_user() {
    this.loading = true;
    this.signupModel.finger_print = FingerPrintJS();
    this.service.signup_user(this.signupModel).subscribe(response => {
      if (response.message === 'success') {
        this.errorMsg = '';
        $('.confirmEmailMsg').fadeIn(1000);
      } else {
        this.errorMsg = 'Please contact to administrator';
      }
      this.loading = false;
    }, error => {
      this.errorMsg = error;
      this.loading = false;
    });
  }

  assetsPath: any;
  fingerPrint: any;

  ngOnInit() {
    this.assetsPath = AppConstants.assetsPath;
    if (this.authService.isAuthorised()) {
      this.router.navigateByUrl('/');
    }
    this.signupModel = new UserSignupModel();
  }

}
