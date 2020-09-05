import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Admin404Component} from './modules/admin-404/admin-404.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'admin/login', pathMatch: 'full'
  },
  // {
  //   path: 'signup', component: SignupComponent
  // },
  {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule'
  },
  {
    path: '**',
    component: Admin404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

export const RoutingComponents = [
  Admin404Component
];

