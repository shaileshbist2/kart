import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../../shared/auth.service';
import {Router} from '@angular/router';
import {Ng2DeviceService} from 'ng2-device-detector';
import {AdminLoginService} from './admin-login.service';
import {SessionService} from '../../../shared/session.service';
import {AppConstants} from '../../../shared/app.constants';
import {AdminModel} from '../../../models/adminModel';
// import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginModel: any;
  loading = false;
  assetsPath: any;
  errorMsg: any;

  constructor(private translate: TranslateService,
              private authService: AuthService,
              private router: Router,
              private deviceService: Ng2DeviceService,
              private service: AdminLoginService,
              private sessionService: SessionService) {
  }

  doLogin() {
    this.loading = true;
    this.service.doLogin(this.loginModel).subscribe(response => {
      this.loading = false;
      if (response.message) {
        this.authService.adminClaim.token = response.data[0].login_token;
        this.authService.adminClaim.firstName = response.data[0].first_name;
        this.authService.adminClaim.lastName = response.data[0].last_name;
        this.authService.adminClaim.isAuthenticated = true;
        this.sessionService.addItem('adminClaim', this.authService.adminClaim);
        this.router.navigateByUrl('admin/dashboard');
      }
    }, error => {
      this.errorMsg = error;
      this.loading = false;
    });
  }

  ngOnInit() {
    this.assetsPath = AppConstants.assetsPath;
    if (this.authService.isAuthorised()) {
      this.router.navigateByUrl('admin/dashboard');
    }
    this.loginModel = new AdminModel();
    this.loginModel.appId = AppConstants.appId;
    this.loginModel.deviceInfo = this.deviceService.getDeviceInfo();
  }
}
