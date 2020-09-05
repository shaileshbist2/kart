import {Component, OnInit} from '@angular/core';
import {UserAboutUsService} from './user-aboutus.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from "../../shared/app.constants";
declare var $: any;
@Component({
  selector: 'app-user-aboutus',
  templateUrl: './user-aboutus.component.html',
  styleUrls: ['./user-aboutus.component.css']
})
export class UserAboutUsComponent implements OnInit {

  constructor(private service: UserAboutUsService,
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
