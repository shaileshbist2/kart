import {Component, OnInit} from '@angular/core';
import {UserLoginService} from './user-login.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {UserLoginModel} from '../../models/user/userLoginModel';
import {AppConstants} from '../../shared/app.constants';
import {SessionService} from '../../shared/session.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginModel: any;
  errorMsg: any;
  loading: any;
  assetsPath: any;

  constructor(private service: UserLoginService,
              private router: Router,
              private authService: AuthService,
              private sessionService: SessionService) {
  }

  login_user() {
    this.loading = true;
    this.service.login_user(this.loginModel).subscribe(response => {
      if (response.message === 'success') {
        this.authService.userClaim.token = response.data[0].login_token;
        this.authService.userClaim.isAuthenticated = true;
        this.authService.userClaim.userType = response.data[0].user_type;
        this.authService.userClaim.firstName = response.data[0].first_name;
        this.authService.userClaim.lastName = response.data[0].last_name;
        this.authService.userClaim.emailVerified = response.data[0].email_verified;
        this.sessionService.addItem('userClaim', this.authService.userClaim);
        localStorage.setItem('login-event', 'login' + Math.random());
        if (this.sessionService.getItem('last_route')) {
          this.router.navigateByUrl(this.sessionService.getItem('last_route'));
        } else {
          this.router.navigateByUrl('user/home');
        }
      } else {
        this.errorMsg = 'Please contact to administrator';
      }
      this.loading = false;
    }, error => {
      if (error === 'undefined') {
        this.errorMsg = 'Login failed / please login after some times';
      } else {
        this.errorMsg = error;
      }
      this.loading = false;
    });
  }

  ngOnInit() {
    if (this.authService.isAuthorised()) {
      this.router.navigateByUrl('/');
    }
    this.assetsPath = AppConstants.assetsPath;
    this.loginModel = new UserLoginModel();
  }

}
