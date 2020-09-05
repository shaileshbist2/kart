import {Component, OnInit} from '@angular/core';
import {UserWhyDatakartService} from './user-whydatakart.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from "../../shared/app.constants";
declare var $: any;
@Component({
  selector: 'app-user-whydatakart',
  templateUrl: './user-whydatakart.component.html',
  styleUrls: ['./user-whydatakart.component.css']
})
export class UserWhyDatakartComponent implements OnInit {
  homeModel: any;
  public loading = false;

  constructor(private service: UserWhyDatakartService,
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
