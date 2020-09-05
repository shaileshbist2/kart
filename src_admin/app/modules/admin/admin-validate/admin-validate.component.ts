import {Component, OnInit} from '@angular/core';
import {AdminValidateService} from './admin-validate.service';
import {UserValidateModel} from '../../../models/adminModel';

declare const $: any;

@Component({
  selector: 'app-admin-validate',
  templateUrl: './admin-validate.component.html',
  styleUrls: ['./admin-validate.component.css']
})
export class AdminValidateComponent implements OnInit {
  validate: any;
  emailValidateError: any;
  loader1 = false;
  loader2 = false;
  isDisabledBtn1 = false;
  isDisabledBtn2 = false;

  totalPeopleData = 0;
  totalCompanyData = 0;
  totalValidEmail = 0;
  totalInvalidEmail = 0;
  faClass = 'fa fa-refresh pull-right';
  errorMsg = '';
  commaSeparatedEmails = '';
  emailIdObj = [];

  constructor(private service: AdminValidateService) {
  }

  startEmailValidateProcess_a() {
    if (this.validate.start_row >= 0) {
      this.emailValidateError = '';
      this.isDisabledBtn1 = true;
      this.loader1 = true;
      this.service.startEmailValidateProcess_a(this.validate).subscribe(response => {
        if (response.data[0] === false) {
          this.emailValidateError = `No data available`;
        } else {
          this.emailValidateError = `Email Validation Successfully Done`;
          this.getDashboardDetails_a();
        }
        this.loader1 = false;
        this.isDisabledBtn1 = false;
      });
    } else {
      this.emailValidateError = `Please set valid start row (should be above 0)`;
      this.isDisabledBtn1 = false;
    }
  }

  startEmailValidateCommaSeparatedProcess_a() {
    if (this.commaSeparatedEmails !== '') {
      this.errorMsg = '';
      this.loader2 = true;
      this.isDisabledBtn2 = true;
      this.service.startEmailValidateCommaSeparatedProcess_a(this.commaSeparatedEmails).subscribe(response => {
        if (response.data[0].boolean === false) {
          this.errorMsg = `No data available`;
        } else {
          this.errorMsg = `Email Validation Successfully Done`;
          this.emailIdObj = response.data[0].emailIdObj;
          this.getDashboardDetails_a();
        }
        this.errorMsg = '';
        this.loader2 = false;
        this.isDisabledBtn2 = false;
      });
    } else {
      this.errorMsg = 'Please Enter Email Address';
    }
  }

  getDashboardDetails_a() {
    this.faClass = 'fa fa-refresh pull-right fa-spin';
    this.service.getDashboardDetails_a().subscribe(response => {
      this.totalPeopleData = response.data[0].total_people;
      this.totalCompanyData = response.data[0].total_companies;
      this.totalValidEmail = response.data[0].valid_email;
      this.totalInvalidEmail = response.data[0].invalid_email;
      this.faClass = 'fa fa-refresh pull-right';
    });
  }

  refreshInfo() {
    this.getDashboardDetails_a();
  }

  ngOnInit() {
    this.getDashboardDetails_a();
    this.validate = new UserValidateModel();
  }
}
