import {Component, OnInit} from '@angular/core';
import {AdminDashboardService} from './admin-dashboard.service';

declare const $: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private service: AdminDashboardService) {
  }

  totalPeopleData = 0;
  totalCompanyData = 0;
  totalValidEmail = 0;
  totalInvalidEmail = 0;
  faClass = 'fa fa-refresh pull-right';
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
  }

}
