import {Component, OnInit} from '@angular/core';
import {UserOurServicesService} from './user-ourservices.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from "../../shared/app.constants";

declare var $: any;

@Component({
  selector: 'app-user-ourservices',
  templateUrl: './user-ourservices.component.html',
  styleUrls: ['./user-ourservices.component.css']
})
export class UserOurServicesComponent implements OnInit {
  constructor(private service: UserOurServicesService,
              private router: Router,
              private authService: AuthService,
              private sessionService: SessionService) {
    window.scroll(0, 0);

  }

  assetsPath: any;
  isAuth: any;

  ngOnInit() {
    this.isAuth = this.authService.isAuthorised();
    this.assetsPath = AppConstants.assetsPath;
  }

}
