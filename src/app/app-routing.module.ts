import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { CompanyInfoComponent } from './infoOperation/company-info/company-info.component';
import { PromotionListComponent } from './infoOperation/promotion-list/promotion-list.component';
import { RegisterCustomerComponent } from './customerOperation/register-customer/register-customer.component';
import { UpdateCustomerComponent } from './customerOperation/update-customer/update-customer.component';
import { SongListComponent } from './infoOperation/song-list/song-list.component';
import { DeleteFoodOrderComponent } from './foodOrderOperation/delete-food-order/delete-food-order.component';
import { ViewPastFoodOrdersComponent } from './foodOrderOperation/view-past-food-orders/view-past-food-orders.component';
import { ShoppingCartComponent } from './foodOrderOperation/shopping-cart/shopping-cart.component';
import { ViewFoodItemDetailComponent } from './foodOrderOperation/view-food-item-detail/view-food-item-detail.component';
import { FoodItemMenuComponent } from './foodOrderOperation/food-item-menu/food-item-menu.component';
import { CheckoutComponent } from './foodOrderOperation/checkout/checkout.component';
import { ViewTransactionDetailsComponent } from './foodOrderOperation/view-transaction-details/view-transaction-details.component';
import { CreateNewReservationComponent } from './reservationOperation/create-new-reservation/create-new-reservation.component';
import { ViewReservationsComponent } from './reservationOperation/view-reservations/view-reservations.component';
import { UpdateReservationComponent } from './reservationOperation/update-reservation/update-reservation.component';
import { OutletListComponent } from './infoOperation/outlet-list/outlet-list.component';
import { RoomPriceComponent } from './infoOperation/room-price/room-price.component';
import { MembershipPointsComponent } from './customerOperation/membership-points/membership-points.component';


const routes: Routes = [
  { path: '', redirectTo: "/index", pathMatch: "full" },
  { path: 'index', component: IndexComponent },
  { path: 'accessRightError', component: AccessRightErrorComponent },
  { path: 'aboutUs', component: CompanyInfoComponent },
  { path: 'promotions', component: PromotionListComponent},
  { path: 'registerCustomer', component: RegisterCustomerComponent },
  { path: 'customerOperation/updateCustomer', component: UpdateCustomerComponent },
  { path: 'songOperation/songList', component: SongListComponent},
  { path: 'foodOrderOperation/deleteFoodOrder', component: DeleteFoodOrderComponent},
  { path: 'foodOrderOperation/viewPastFoodOrders', component: ViewPastFoodOrdersComponent},
  { path: 'foodOrderOperation/shoppingCart', component: ShoppingCartComponent},
  { path: 'foodOrderOperation/foodItemMenu', component: FoodItemMenuComponent},
  { path: 'foodOrderOperation/viewFoodItemDetails', component: ViewFoodItemDetailComponent},
  { path: 'foodOrderOperation/viewFoodItemDetails/:foodItemId', component: ViewFoodItemDetailComponent},
  { path: 'foodOrderOperation/checkout', component:CheckoutComponent},
  { path: 'foodOrderOperation/viewTransactionDetails/:foodOrderTransactionId', component:ViewTransactionDetailsComponent},
  { path: 'foodOrderOperation/viewTransactionDetails', component:ViewTransactionDetailsComponent},
  { path: 'reservationOperation/viewReservations', component: ViewReservationsComponent},
  { path: 'reservationOperation/createNewReservation', component: CreateNewReservationComponent},
  { path: 'reservationOperation/updateReservation', component: UpdateReservationComponent},
  { path: 'locateUs', component: OutletListComponent },
  { path: 'price', component: RoomPriceComponent },
  { path: 'customerOperation/myMembershipPoints', component: MembershipPointsComponent }
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
