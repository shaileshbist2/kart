import {Component, OnInit} from '@angular/core';
import {UserPrivacyPolicyService} from './user-privacy-policy.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from "../../shared/app.constants";
declare var $: any;
@Component({
  selector: 'app-user-privacy-policy',
  templateUrl: './user-privacy-policy.component.html',
  styleUrls: ['./user-privacy-policy.component.css']
})
export class UserPrivacyPolicyComponent implements OnInit {

  constructor(private service: UserPrivacyPolicyService,
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
