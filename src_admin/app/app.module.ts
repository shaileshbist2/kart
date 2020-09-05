import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRoutingModule, RoutingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './shared/interceptor/auth-interceptor';
import {EqualValidator} from './shared/directive/equal-validator.directive';
import {HelperService} from './shared/helper.service';
import {CookieService} from 'ngx-cookie-service';
import {SessionService} from './shared/session.service';
import {ApiService} from './shared/api.service';
import {AuthService} from './shared/auth.service';
import {SharedModule} from './shared/modules/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    EqualValidator,
    RoutingComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    HelperService,
    CookieService,
    SessionService,
    ApiService,
    AuthService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
}

