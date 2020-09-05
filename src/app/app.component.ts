import {Component} from '@angular/core';
import 'hammerjs';
import {CookieService} from 'ngx-cookie-service';
import {HelperService} from './shared/helper.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sellosphere Application';

  constructor(private cookieService: CookieService,
              private helperService: HelperService,
              private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

  ngOnInit() {
    /*if (!this.cookieService.check('sessionEncodeKey')) {
        let key = this.helperService.generateKey(128);
        this.cookieService.set('sessionEncodeKey', key, 365, "/");
    }*/
  }
}
