import {Component, OnInit} from '@angular/core';
import {UserSettingService} from './user-setting.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {UserSettingModel} from '../../models/user/userSettingModel';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from '../../shared/app.constants';

declare var $: any;

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit {
  settingModel: any;
  profileInfoView = true;
  editProfileView = false;
  emailConfirmPanel: any;
  public loading = false;

  constructor(private service: UserSettingService,
              private router: Router,
              private authService: AuthService,
              private sessionService: SessionService) {
  }

  confirmLink: any;

  // getSettingInfo_user() {
  //   this.service.getSettingInfo_user().subscribe(response => {
  //
  //   });
  // }

  sendEmailConfirmationMail_user() {
    this.service.sendEmailConfirmation_user().subscribe(response => {
      if (response.message === 'success') {
        $('.successMsg').fadeOut(1000);
        $('.successMsg').fadeIn(1000);
      }
    })
  }

  backBtn() {
    this.profileInfoView = true;
    this.editProfileView = false;
  }

  editBtn() {
    this.profileInfoView = false;
    this.editProfileView = true;
  }

  countryList: any;

  getCountryList_user() {
    this.service.getCountryList_user().subscribe(response => {
      this.countryList = response.data[0].countryList;
    });
  }

  stateList: any;

  getStateList_user(data) {
    this.settingModel.state = 'undefined';
    const country_code = data.split('_')[0] || '';
    this.service.getStateList_user(country_code).subscribe(response => {
      this.stateList = response.data[0].stateList;
    });
  }
  errorMsg: any;
  updateProfile_user(settingModel) {
    if (settingModel.state !== 'undefined') {
      this.errorMsg = '';
      this.service.updateProfile_user(settingModel).subscribe(response => {
        if (response.message === 'success') {
          $('.successMsg').fadeIn(1000);
          $('.successMsg').fadeOut(1000);
          this.authService.userClaim.firstName = settingModel.first_name;
          this.authService.userClaim.lastName = settingModel.last_name;
          this.sessionService.addItem('userClaim', this.authService.userClaim);
        }
        this.getProfileDetails_user();
      });
    } else {
      this.errorMsg = 'Please select state';
    }
  }

  getProfileDetails_user() {
    this.service.getProfileDetails_user().subscribe(response => {
      this.settingModel.first_name = response.data[0].first_name;
      this.settingModel.last_name = response.data[0].last_name;
      this.settingModel.address = response.data[0].address;
      this.settingModel.email_id = response.data[0].email_id;
      this.settingModel.mobile_number = response.data[0].mobile_number;
      this.settingModel.city = response.data[0].city_name || '';
      this.settingModel.country_name = response.data[0].country_name;
      this.settingModel.state_name = response.data[0].state_name;
      this.settingModel.country = response.data[0].country_name_code +
        '_' + response.data[0].country_code +
        '_' + response.data[0].country_name;
      this.getStateList_user(response.data[0].country_name_code);
      this.settingModel.state = response.data[0].state_subdivision +
        '_' + response.data[0].state_name;
    });
  }


  assetsPath: any;

  ngOnInit() {
    if (!this.authService.isAuthorised()) {
      this.router.navigateByUrl('user/login');
    } else if (!this.authService.isEmailVerified()) {
      this.emailConfirmPanel = true;
      this.router.navigateByUrl('user/setting');
    } else {
      this.emailConfirmPanel = false;
    }
    this.assetsPath = AppConstants.assetsPath;
    this.settingModel = new UserSettingModel();
    // this.getSettingInfo_user();
    this.getCountryList_user();
    this.getProfileDetails_user();
  }

}
