import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileSelectDirective, FileUploadModule} from 'ng2-file-upload';
import {AppRoutingModule, routingComponents} from './routing/app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClient} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthInterceptor} from './shared/interceptor/auth-interceptor';
import {EqualValidator} from './shared/directive/equal-validator.directive';
// import {Ng2DeviceDetectorModule} from 'ng2-device-detector';
import {HelperService} from './shared/helper.service';
import {CookieService} from 'ngx-cookie-service';
import {SessionService} from './shared/session.service';
import {ApiService} from './shared/api.service';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AuthService} from './shared/auth.service';
import {ANIMATION_TYPES, LoadingModule} from 'ngx-loading';
import {MaterialModule} from './material.module';
import {CommonModule} from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {Ng2AutoCompleteModule} from 'ng2-auto-complete';
import {TypeaheadModule, TabsModule, ModalModule} from 'ngx-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SearchPipe} from './search.pipe';
import {SortPipe} from './sort.pipe';


/************************ USER ****************************************************************/
import {SearchPeopleService} from './search/search-people/search-people.service';
import {SearchCompanyService} from './search/search-company/search-company.service';
import {SearchHeaderService} from './search/search-header/search-header.service';
import {UserHomeService} from './user/user-home/user-home.service';
import {UserAboutUsService} from './user/user-aboutus/user-aboutus.service';
import {UserOurServicesService} from './user/user-ourservices/user-ourservices.service';
import {UserWhyDatakartService} from './user/user-whydatakart/user-whydatakart.service';
import {UserTermsConditionsService} from './user/user-terms-conditions/user-terms-conditions.service';
import {UserPrivacyPolicyService} from './user/user-privacy-policy/user-privacy-policy.service';
import {UserHeaderService} from './user/user-header/user-header.service';
import {UserFooterService} from './user/user-footer/user-footer.service';
import {UserLoginService} from './user/user-login/user-login.service';
import {UserForgotPasswordService} from './user/user-forgotpassword/user-forgotpassword.service';
import {UserSignupService} from './user/user-signup/user-signup.service';
import {UserProfileService} from './user/user-profile/user-profile.service';
import {UserContactService} from './user/user-contact/user-contact.service';
import {UserPriceService} from './user/user-price/user-price.service';
import {UserHistoryService} from './user/user-history/user-history.service';
import {UserConfirmEmailService} from './user/user-confirm-email/user-confirm-email.service';
import {UserSettingService} from './user/user-setting/user-setting.service';
import {UserStoreService} from './user/user-store/user-store.service';
import {UserListService} from './user/user-list/user-list.service';
import {UserCheckoutService} from './user/user-checkout/user-checkout.service';
import {UserPurchaseHistoryService} from './user/user-purchase-history/user-purchase-history.service';
import {UserPeopleSearchService} from './user/user-people-search/user-people-search.service';
import {UserLeadSearchService} from './user/user-lead-search/user-lead-search.service';
import {UserTechSearchService} from './user/user-tech-search/user-tech-search.service';
import {UserConsultingServiceService} from './user/user-consulting-service/user-consulting-service.service';
import {UserSampleService} from './user/user-sample/user-sample.service';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    EqualValidator,
    routingComponents,
    SearchPipe,
    SortPipe
  ],
  imports: [
    Ng2AutoCompleteModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    AngularMultiSelectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.circle,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      primaryColour: '#fc3600',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: true
    }),
    MaterialModule,
    CommonModule,
    DataTablesModule,
    FileUploadModule,
    NgbModule
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
    AuthService,
    SearchPeopleService,
    SearchCompanyService,
    SearchHeaderService,
    UserHeaderService,
    UserFooterService,
    UserHomeService,
    UserAboutUsService,
    UserOurServicesService,
    UserWhyDatakartService,
    UserTermsConditionsService,
    UserPrivacyPolicyService,
    UserLoginService,
    UserForgotPasswordService,
    UserSignupService,
    UserProfileService,
    UserContactService,
    UserPriceService,
    UserHistoryService,
    UserConfirmEmailService,
    UserSettingService,
    UserStoreService,
    UserListService,
    UserCheckoutService,
    UserPurchaseHistoryService,
    UserPeopleSearchService,
    UserLeadSearchService,
    UserTechSearchService,
    UserConsultingServiceService,
    UserSampleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

