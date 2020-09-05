import {NgModule} from '@angular/core';
import {AdminHeaderComponent} from '../../modules/admin/admin-header/admin-header.component';
import {AdminFooterComponent} from '../../modules/admin/admin-footer/admin-footer.component';
import {SharedModule} from './shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DynamicFormBuilderModule} from '../../modules/admin/admin-manage-people/dynamic-form-builder/dynamic-form-builder.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    DynamicFormBuilderModule
  ],
  declarations: [
    AdminHeaderComponent,
    AdminFooterComponent
  ],
  exports: [
    AdminHeaderComponent,
    AdminFooterComponent,
    SharedModule,
    DynamicFormBuilderModule
  ]
})
export class AdminSharedModule {
}
