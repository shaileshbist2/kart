import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchPeopleComponent} from '../search/search-people/search-people.component';
import {SearchCompanyComponent} from '../search/search-company/search-company.component';
import {SearchHeaderComponent} from '../search/search-header/search-header.component';
import {UserProfileComponent} from '../user/user-profile/user-profile.component';
import {UserSignupComponent} from '../user/user-signup/user-signup.component';
import {UserLoginComponent} from '../user/user-login/user-login.component';
import {UserForgotPasswordComponent} from '../user/user-forgotpassword/user-forgotpassword.component';
import {UserHomeComponent} from '../user/user-home/user-home.component';
import {UserAboutUsComponent} from '../user/user-aboutus/user-aboutus.component';
import {UserOurServicesComponent} from '../user/user-ourservices/user-ourservices.component';
import {UserWhyDatakartComponent} from '../user/user-whydatakart/user-whydatakart.component';
import {UserTermsConditionsComponent} from '../user/user-terms-conditions/user-terms-conditions.component';
import {UserPrivacyPolicyComponent} from '../user/user-privacy-policy/user-privacy-policy.component';
import {UserHeaderComponent} from '../user/user-header/user-header.component';
import {UserFooterComponent} from '../user/user-footer/user-footer.component';
import {UserContactComponent} from '../user/user-contact/user-contact.component';
import {UserPriceComponent} from '../user/user-price/user-price.component';
import {UserHistoryComponent} from '../user/user-history/user-history.component';
import {UserConfirmEmailComponent} from '../user/user-confirm-email/user-confirm-email.component';
import {UserSettingComponent} from '../user/user-setting/user-setting.component';
import {UserStoreComponent} from '../user/user-store/user-store.component';
import {UserListComponent} from '../user/user-list/user-list.component';
import {UserCheckoutComponent} from '../user/user-checkout/user-checkout.component';
import {UserPurchaseHistoryComponent} from '../user/user-purchase-history/user-purchase-history.component';
import {UserPeopleSearchComponent} from '../user/user-people-search/user-people-search.component';
import {UserLeadSearchComponent} from '../user/user-lead-search/user-lead-search.component';
import {UserTechSearchComponent} from '../user/user-tech-search/user-tech-search.component';
import {UserConsultingServiceComponent} from '../user/user-consulting-service/user-consulting-service.component';
import {UserSampleComponent} from '../user/user-sample/user-sample.component';

const routes: Routes = [
  {path: '', component: UserHomeComponent},
  {path: 'user', redirectTo: 'user/login', pathMatch: 'full'},
  {path: 'company', component: SearchCompanyComponent},
  {path: 'search', component: SearchCompanyComponent},
  {path: 'people', component: SearchPeopleComponent},
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/forgot-password', component: UserForgotPasswordComponent},
  {path: 'user/about-us', component: UserAboutUsComponent},
  {path: 'user/our-services', component: UserOurServicesComponent},
  {path: 'user/why-datakart', component: UserWhyDatakartComponent},
  {path: 'user/terms-conditions', component: UserTermsConditionsComponent},
  {path: 'user/privacy-policy', component: UserPrivacyPolicyComponent},
  {path: 'user/confirm_email/:token', component: UserConfirmEmailComponent},
  {path: 'user/profile', component: UserProfileComponent},
  {path: 'user/contact', component: UserContactComponent},
  {path: 'user/price', component: UserPriceComponent},
  {path: 'user/signup', component: UserSignupComponent},
  {path: 'user/history', component: UserHistoryComponent},
  {path: 'user/setting', component: UserSettingComponent},
  {path: 'user/store', component: UserStoreComponent},
  {path: 'user/store/:country', component: UserStoreComponent},
  {path: 'user/store/:country/:department', component: UserStoreComponent},
  {path: 'user/store/:country/:department/:domain', component: UserStoreComponent},
  {path: 'user/list/:id/:title', component: UserListComponent},
  {path: 'user/checkout', component: UserCheckoutComponent},
  {path: 'user/purchase-history', component: UserPurchaseHistoryComponent},
  {path: 'user/people-search', component: UserPeopleSearchComponent},
  {path: 'user/lead-search', component: UserLeadSearchComponent},
  {path: 'user/tech-search', component: UserTechSearchComponent},
  {path: 'consulting-service', component: UserConsultingServiceComponent},
  {path: 'sample', component: UserSampleComponent},
  {path: '**', component: UserHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

export const routingComponents = [
  SearchCompanyComponent,
  SearchHeaderComponent,
  SearchPeopleComponent,

  UserProfileComponent,
  UserSignupComponent,
  UserLoginComponent,
  UserForgotPasswordComponent,
  UserHomeComponent,
  UserAboutUsComponent,
  UserOurServicesComponent,
  UserWhyDatakartComponent,
  UserTermsConditionsComponent,
  UserPrivacyPolicyComponent,
  UserHeaderComponent,
  UserFooterComponent,
  UserContactComponent,
  UserPriceComponent,
  UserHistoryComponent,
  UserConfirmEmailComponent,
  UserSettingComponent,
  UserStoreComponent,
  UserListComponent,
  UserCheckoutComponent,
  UserPurchaseHistoryComponent,
  UserPeopleSearchComponent,
  UserLeadSearchComponent,
  UserTechSearchComponent,
  UserConsultingServiceComponent,
  UserSampleComponent,
];

