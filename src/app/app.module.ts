import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';


import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule  } from 'primeng/inputtext';
import { DataViewModule} from 'primeng/dataview';
import { SplitButtonModule } from 'primeng/splitbutton';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { MainMenuComponent } from './template/main-menu/main-menu.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';

import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { CompanyInfoComponent } from './infoOperation/company-info/company-info.component';
import { PromotionListComponent } from './infoOperation/promotion-list/promotion-list.component';
import { SongListComponent, AddToSongQueueBottomSheet } from './infoOperation/song-list/song-list.component';
import { RegisterCustomerComponent } from './customerOperation/register-customer/register-customer.component';
import { UpdateCustomerComponent, ConfirmDialogComponent } from './customerOperation/update-customer/update-customer.component';
import { DeleteFoodOrderComponent } from './foodOrderOperation/delete-food-order/delete-food-order.component';
import { ShoppingCartComponent } from './foodOrderOperation/shopping-cart/shopping-cart.component';
import { ViewPastFoodOrdersComponent } from './foodOrderOperation/view-past-food-orders/view-past-food-orders.component';
import { FoodItemMenuComponent } from './foodOrderOperation/food-item-menu/food-item-menu.component';
import { ViewFoodItemDetailComponent } from './foodOrderOperation/view-food-item-detail/view-food-item-detail.component';
import { CheckoutComponent } from './foodOrderOperation/checkout/checkout.component';
import { ViewTransactionDetailsComponent } from './foodOrderOperation/view-transaction-details/view-transaction-details.component';
import { ViewReservationsComponent, ViewDialogComponent, DeleteDialogComponent } from './reservationOperation/view-reservations/view-reservations.component';
import { CreateNewReservationComponent } from './reservationOperation/create-new-reservation/create-new-reservation.component';
import { UpdateReservationComponent } from './reservationOperation/update-reservation/update-reservation.component';
import { OutletListComponent } from './infoOperation/outlet-list/outlet-list.component';
import { RoomPriceComponent } from './infoOperation/room-price/room-price.component';
import { MembershipPointsComponent } from './customerOperation/membership-points/membership-points.component';
import { SongQueueComponent } from './reservationOperation/song-queue/song-queue.component';
import { FavouritePlaylistComponent, AddPlaylistToSongQueueBottomSheet } from './customerOperation/favourite-playlist/favourite-playlist.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    MainMenuComponent,
    SidebarComponent,
    AccessRightErrorComponent,
    RegisterCustomerComponent,
    UpdateCustomerComponent,
    DeleteFoodOrderComponent,
    ShoppingCartComponent,
    ViewPastFoodOrdersComponent,
    FoodItemMenuComponent,
    ConfirmDialogComponent,
    SongListComponent,
    AddToSongQueueBottomSheet,
    ViewFoodItemDetailComponent,
    CheckoutComponent,
    ViewTransactionDetailsComponent,
    CompanyInfoComponent,
    PromotionListComponent,
    ViewReservationsComponent,
    CreateNewReservationComponent,
    ViewDialogComponent,
    DeleteDialogComponent,
    UpdateReservationComponent,
    OutletListComponent,
    RoomPriceComponent,
    MembershipPointsComponent,
    SongQueueComponent,
    FavouritePlaylistComponent,
    AddPlaylistToSongQueueBottomSheet
  ],
  
  imports: [
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PanelModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DataViewModule,
    SplitButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    MatTreeModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatStepperModule,
    NgxMatMomentModule,
    NgxMaterialTimepickerModule,
    MatRadioModule,
    MatDividerModule,
    MatTooltipModule,
    MatBottomSheetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
