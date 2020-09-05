import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/auth.service';
import {Router} from '@angular/router';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.css']
})
export class AdminFooterComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    if (!this.authService.isAuthorised()) {
      this.router.navigateByUrl('admin/login');
    }
  }
}
