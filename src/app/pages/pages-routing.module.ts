import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { InfoComponent } from './info/info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: 'customer',
    component: CustomerComponent,
  },
  {
    path: 'add-customer',
    component: AddCustomerComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'homepage',
    component: HomePageComponent,
  },
  {
    path: 'info',
    component: InfoComponent,
  },
  {
    path: 'change-pasword',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
