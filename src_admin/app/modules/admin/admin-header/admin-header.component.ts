import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/auth.service';
import {Router} from '@angular/router';
import {AppConstants} from '../../../shared/app.constants';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  assetsPath: any;
  adminFullName: any;
  constructor(private authService: AuthService,
              private router: Router) {
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('admin/login');
  }

  ngOnInit() {
    this.adminFullName = this.authService.authorizedFullName();
    this.assetsPath = AppConstants.assetsPath;
    if (!this.authService.isAuthorised()) {
      this.router.navigateByUrl('admin/login');
    }
  }
}
