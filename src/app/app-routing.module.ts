import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { RegisterCustomerComponent } from './customerOperation/register-customer/register-customer.component';
import { UpdateCustomerComponent } from './customerOperation/update-customer/update-customer.component';
import { DeleteFoodOrderComponent } from './foodOrderOperation/delete-food-order/delete-food-order.component';
import { ViewPastFoodOrdersComponent } from './foodOrderOperation/view-past-food-orders/view-past-food-orders.component';
import { ShoppingCartComponent } from './foodOrderOperation/shopping-cart/shopping-cart.component';
import { UpdateShoppingCartComponent } from './foodOrderOperation/update-shopping-cart/update-shopping-cart.component';

const routes: Routes = [
  { path: '', redirectTo: "/index", pathMatch: "full" },
  { path:'index', component: IndexComponent },
  { path:'accessRightError', component: AccessRightErrorComponent },
  { path:'customerOperation/registerCustomer', component: RegisterCustomerComponent },
  { path:'customerOperation/updateCustomer', component: UpdateCustomerComponent },
  { path:'foodOrderOperation/deleteFoodOrder', component: DeleteFoodOrderComponent},
  { path:'foodOrderOperation/updateShoppingCart', component: UpdateShoppingCartComponent},
  { path:'foodOrderOperation/viewPastFoodOrders', component: ViewPastFoodOrdersComponent},
  { path:'foodOrderOperation/shoppingCart', component: ShoppingCartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
