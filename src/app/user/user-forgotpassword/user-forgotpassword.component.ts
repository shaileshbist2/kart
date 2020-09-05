import {Component, OnInit} from '@angular/core';
import {UserForgotPasswordService} from './user-forgotpassword.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {UserForgotPasswordModel} from '../../models/user/userForgotPasswordModel';
import {AppConstants} from '../../shared/app.constants';
import {SessionService} from '../../shared/session.service';

@Component({
  selector: 'app-user-forgotpassword',
  templateUrl: './user-forgotpassword.component.html',
  styleUrls: ['./user-forgotpassword.component.css']
})
export class UserForgotPasswordComponent implements OnInit {
  forgotPasswordModel: any;
  forgotPasswordView = true;
  resetPasswordView = false;
  errorMsg: any;
  errorMsg2: any;
  loading: any;

  constructor(private service: UserForgotPasswordService,
              private router: Router,
              private authService: AuthService,
              private sessionService: SessionService) {
  }

  emailOTPResetPass_user(email_id) {
    this.service.emailOTPResetPass_user(email_id).subscribe(response => {
      this.forgotPasswordView = false;
      this.resetPasswordView = true;
      this.errorMsg = '';
    }, error => {
      this.errorMsg = error;
    });

  }

  resetPassword_user(forgotPasswordModel) {
    this.service.resetPassword_user(forgotPasswordModel).subscribe(response => {
      if (response.message === 'success') {
        this.errorMsg2 = '';
        $('.successMsg').fadeIn(1000);
        $('.successMsg').fadeOut(1000);
        setTimeout(() => {
          this.router.navigateByUrl('user/login');
        }, 2000)
      }
    }, error => {
      this.errorMsg2 = error;
    });
  }

  backToForgetPasswordView() {
    this.forgotPasswordView = true;
    this.resetPasswordView = false;
  }

  assetsPath: any;

  ngOnInit() {
    if (this.authService.isAuthorised()) {
      this.router.navigateByUrl('/');
    }
    this.assetsPath = AppConstants.assetsPath;
    this.forgotPasswordModel = new UserForgotPasswordModel();
  }

}
