import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { SongListComponent } from './songOperation/song-list/song-list.component';

import { RegisterCustomerComponent } from './customerOperation/register-customer/register-customer.component';
import { UpdateCustomerComponent } from './customerOperation/update-customer/update-customer.component';

import { DeleteFoodOrderComponent } from './foodOrderOperation/delete-food-order/delete-food-order.component';
import { ViewPastFoodOrdersComponent } from './foodOrderOperation/view-past-food-orders/view-past-food-orders.component';
import { ShoppingCartComponent } from './foodOrderOperation/shopping-cart/shopping-cart.component';
import { ViewFoodItemDetailComponent } from './foodOrderOperation/view-food-item-detail/view-food-item-detail.component';
import { FoodItemMenuComponent } from './foodOrderOperation/food-item-menu/food-item-menu.component';
import { CheckoutComponent } from './foodOrderOperation/checkout/checkout.component';

import { ViewReservationsComponent } from './reservationOperation/view-reservations/view-reservations.component';
import { CreateNewReservationComponent } from './reservationOperation/create-new-reservation/create-new-reservation.component';


const routes: Routes = [
  { path: '', redirectTo: "/index", pathMatch: "full" },
  { path: 'index', component: IndexComponent },
  { path: 'accessRightError', component: AccessRightErrorComponent },
  { path: 'aboutUs', component: CompanyInfoComponent },
  { path: 'promotions', component: PromotionListComponent},
  { path: 'registerCustomer', component: RegisterCustomerComponent },
  { path: 'customerOperation/updateCustomer', component: UpdateCustomerComponent },
  { path: 'foodOrderOperation/deleteFoodOrder', component: DeleteFoodOrderComponent},
  { path: 'foodOrderOperation/viewPastFoodOrders', component: ViewPastFoodOrdersComponent},
  { path: 'foodOrderOperation/shoppingCart', component: ShoppingCartComponent},
  { path: 'songOperation/songList', component: SongListComponent},
  { path: 'foodOrderOperation/foodItemMenu', component: FoodItemMenuComponent},
  { path: 'foodOrderOperation/viewFoodItemDetails', component: ViewFoodItemDetailComponent},
  { path: 'foodOrderOperation/viewFoodItemDetails/:foodItemId', component: ViewFoodItemDetailComponent},
  { path: 'foodOrderOperation/checkout', component:CheckoutComponent},
  { path: 'reservationOperation/viewReservations', component: ViewReservationsComponent},
  { path: 'reservationOperation/createNewReservation', component: CreateNewReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
