import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { RegisterCustomerComponent } from './customerOperation/register-customer/register-customer.component';

const routes: Routes = [
  { path: '', redirectTo: "/index", pathMatch: "full" },
  { path:'index', component: IndexComponent },
  { path:'accessRightError', component: AccessRightErrorComponent },
  { path:'customerOperation/registerCustomer', component: RegisterCustomerComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
