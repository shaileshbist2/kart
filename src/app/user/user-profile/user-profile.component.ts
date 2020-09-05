import {Component, OnInit} from '@angular/core';
import {UserProfileService} from './user-profile.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {UserProfileModel} from '../../models/user/userProfileModel';
import {AppConstants} from '../../shared/app.constants';
import {SessionService} from '../../shared/session.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  loginModel: any;
  yearData: any;
  countryList: any;

  constructor(private service: UserProfileService,
              private router: Router,
              private authService: AuthService,
              private sessionService: SessionService) {
  }


  listOfYear() {
    let today = new Date();
    let yyyy = today.getFullYear();
    let yearData = [{year: 'Select Year'}];
    for (let i = 1919; i <= yyyy; i++) {
      yearData.push({
        year: i.toString()
      });
    }
    this.yearData = yearData;
  }

  getCountryList_user() {
    this.service.getCountryList_user().subscribe(response => {
      this.countryList = response.data[0].country_list;
    });
  }


  ngOnInit() {
    if (!this.authService.isAuthorised()) {
      this.router.navigateByUrl('user/login');
    }
    this.loginModel = new UserProfileModel();

    this.listOfYear();
    this.getCountryList_user();
  }

}
