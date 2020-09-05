import {Component, OnInit} from '@angular/core';
import {UserTermsConditionsService} from './user-terms-conditions.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from "../../shared/app.constants";
declare var $: any;
@Component({
  selector: 'app-user-terms-conditions',
  templateUrl: './user-terms-conditions.component.html',
  styleUrls: ['./user-terms-conditions.component.css']
})
export class UserTermsConditionsComponent implements OnInit {

  constructor(private service: UserTermsConditionsService,
              private router: Router,
              private authService: AuthService,
              private sessionService: SessionService) {
    window.scroll(0, 0);
  }


  assetsPath: any;
  ngOnInit() {
    this.assetsPath = AppConstants.assetsPath;
  }

}
