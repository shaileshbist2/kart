import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminManagePeopleComponent} from './admin-manage-people/admin-manage-people.component';
import {AdminManageFieldComponent} from './admin-manage-field/admin-manage-field.component';
import {AdminCustomerComponent} from './admin-customer/admin-customer.component';
import {AdminUploadComponent} from './admin-upload/admin-upload.component';
import {AdminValidateComponent} from './admin-validate/admin-validate.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: AdminLoginComponent},
  {path: 'dashboard', component: AdminDashboardComponent},
  {path: 'manage-people', component: AdminManagePeopleComponent},
  {path: 'manage-field', component: AdminManageFieldComponent},
  {path: 'manage-customer', component: AdminCustomerComponent},
  {path: 'upload', component: AdminUploadComponent},
  {path: 'validate', component: AdminValidateComponent},
  // {
  //   path: 'change-requests',
  //   loadChildren: './change-request/change-request.module#ChangeRequestModule'
  // }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {
}

export const AdminRoutingComponents = [
  AdminLoginComponent,
  AdminDashboardComponent,
  AdminManagePeopleComponent,
  AdminManageFieldComponent,
  AdminCustomerComponent,
  AdminUploadComponent,
  AdminValidateComponent
];


