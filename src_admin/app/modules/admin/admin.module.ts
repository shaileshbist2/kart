import {NgModule} from '@angular/core';
import {AdminRoutingComponents, AdminRoutingModule} from './admin-routing.module';
import {AdminSharedModule} from '../../shared/modules/admin-shared.module';
import {AdminLoginService} from './admin-login/admin-login.service';
import {AdminDashboardService} from './admin-dashboard/admin-dashboard.service';
import {AdminHeaderService} from './admin-header/admin-header.service';
import {AdminFooterService} from './admin-footer/admin-footer.service';
import {AdminManagePeopleService} from './admin-manage-people/admin-manage-people.service';
import {AdminManageFieldService} from './admin-manage-field/admin-manage-field.service';
import {AdminCustomerService} from './admin-customer/admin-customer.service';
import {AdminUploadService} from './admin-upload/admin-upload.service';
import {AdminValidateService} from './admin-validate/admin-validate.service';
import {TextBoxService} from './admin-manage-people/dynamic-form-builder/atoms/textbox.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FileSelectDirective, FileUploadModule} from 'ng2-file-upload';

@NgModule({
  imports: [
    AdminSharedModule,
    AdminRoutingModule,
    NgbModule,
    FileUploadModule
  ],
  declarations: [AdminRoutingComponents],
  providers: [
    AdminLoginService,
    AdminDashboardService,
    AdminHeaderService,
    AdminFooterService,
    AdminManagePeopleService,
    AdminManageFieldService,
    AdminCustomerService,
    AdminUploadService,
    AdminValidateService,
    TextBoxService
  ]
})
export class AdminModule {
}
