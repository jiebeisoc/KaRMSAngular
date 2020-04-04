import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { RegisterCustomerComponent } from './customerOperation/register-customer/register-customer.component';
import { UpdateCustomerComponent } from './customerOperation/update-customer/update-customer.component';
import { CreateFoodOrderComponent } from './foodOrderOperation/create-food-order/create-food-order.component';
import { DeleteFoodOrderComponent } from './foodOrderOperation/delete-food-order/delete-food-order.component';
import { UpdateFoodOrderComponent } from './foodOrderOperation/update-food-order/update-food-order.component';
import { ViewFoodOrderComponent } from './foodOrderOperation/view-food-order/view-food-order.component';

const routes: Routes = [
  { path: '', redirectTo: "/index", pathMatch: "full" },
  { path:'index', component: IndexComponent },
  { path:'accessRightError', component: AccessRightErrorComponent },
  { path:'customerOperation/registerCustomer', component: RegisterCustomerComponent },
  { path:'customerOperation/updateCustomer', component: UpdateCustomerComponent },
  { path:'foodOrderOperation/createFoodOrder', component: CreateFoodOrderComponent},
  { path:'foodOrderOperation/deleteFoodOrder', component: DeleteFoodOrderComponent},
  { path:'foodOrderOperation/updateFoodOrder', component: UpdateFoodOrderComponent},
  { path:'foodOrderOperation/viewFoodOrder', component: ViewFoodOrderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
