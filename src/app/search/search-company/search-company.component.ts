import {Component, OnInit} from '@angular/core';
import {SearchCompanyService} from './search-company.service';
import {Router} from '@angular/router';
import {SearchCompanyModel} from '../../models/search/searchCompanyModel';
import {AppConstants} from '../../shared/app.constants';
import {SessionService} from '../../shared/session.service';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.css']
})
export class SearchCompanyComponent implements OnInit {
  searchModel: any;
  errorMsg: any;

  constructor(private service: SearchCompanyService,
              private router: Router,
              private sessionService: SessionService) {
  }

  login_user() {
    /*this.service.login_user(this.searchModel).subscribe(response => {
      if (response.message === 'success') {

      } else {
        this.errorMsg = 'Please contact to administrator';
      }
    }, error => {
      this.errorMsg = error;
    });*/
  }

  ngOnInit() {
    /*if (this.authVendorService.isAuthorised()) {
      this.router.navigateByUrl('vendor/dashboard');
    }
    */
    this.searchModel = new SearchCompanyModel();
  }

}
