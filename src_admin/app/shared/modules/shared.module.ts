import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ANIMATION_TYPES, LoadingModule} from 'ngx-loading';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {RouterModule} from '@angular/router';
import {DataTablesModule} from 'angular-datatables';
import {Ng2DeviceDetectorModule} from 'ng2-device-detector';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    Ng2DeviceDetectorModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      primaryColour: '#11abd6',
      secondaryColour: '#ffffff',
      tertiaryColour: '#11abd6',
      fullScreenBackdrop: true,
    }),
    DataTablesModule
  ],
  declarations: [],
  exports: [
    HttpClientModule, FormsModule, ReactiveFormsModule,
    CommonModule, TranslateModule, LoadingModule,
    DataTablesModule, RouterModule, Ng2DeviceDetectorModule
  ]
})
export class SharedModule {
}
