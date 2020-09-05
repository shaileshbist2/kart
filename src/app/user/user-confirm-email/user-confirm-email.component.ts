import {Component, OnInit} from '@angular/core';
import {UserConfirmEmailService} from './user-confirm-email.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {UserHomeModel} from '../../models/user/userHomeModel';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from '../../shared/app.constants';

declare var $: any;

@Component({
  selector: 'app-confirm-email-home',
  templateUrl: './user-confirm-email.component.html',
  styleUrls: ['./user-confirm-email.component.css']
})
export class UserConfirmEmailComponent implements OnInit {
  // homeModel: any;
  public loading = false;

  constructor(private service: UserConfirmEmailService,
              private router: Router,
              private authService: AuthService,
              private sessionService: SessionService) {

    const login_token = this.router.url.split('/')[3].split('_')[0] || '';
    const email_id = this.router.url.split('/')[3].split('_')[1] || '';
    this.service.verifyEmail_user(login_token, email_id).subscribe(response => {
      if (response.message == 'success') {
        this.authService.userClaim.token = response.data[0].login_token;
        this.authService.userClaim.isAuthenticated = true;
        this.authService.userClaim.emailVerified = true;
        this.authService.userClaim.firstName = response.data[0].first_name;
        this.authService.userClaim.lastName = response.data[0].last_name;
        this.sessionService.addItem('userClaim', this.authService.userClaim);
        this.router.navigateByUrl('user/home');
      }
    }, error => {
      if (error == 'invalid_token') {
        this.router.navigateByUrl('user/login');
      }
    });
  }


  assetsPath: any;

  ngOnInit() {
    this.assetsPath = AppConstants.assetsPath;
    // this.homeModel = new UserHomeModel();

  }

}
