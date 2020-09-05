import {Component, OnInit} from '@angular/core';
import {UserFooterService} from './user-footer.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from '../../shared/app.constants';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.css']
})
export class UserFooterComponent implements OnInit {
  contactModel: any;

  constructor(private authService: AuthService,
              private router: Router,
              private sessionService: SessionService,
              private service: UserFooterService) {
  }

  assetsPath: any;
  getCurrentYear: any;

  ngOnInit() {
    this.getCurrentYear = new Date().getFullYear();
    this.assetsPath = AppConstants.assetsPath;
  }
}
