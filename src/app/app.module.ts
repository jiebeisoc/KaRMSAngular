import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {DataViewModule} from 'primeng/dataview';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MessageService} from 'primeng/api';
import {VirtualScrollerModule} from 'primeng/virtualscroller';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { CompanyInfoComponent } from './company-info/company-info.component';

import { RegisterCustomerComponent } from './customerOperation/register-customer/register-customer.component';
import { UpdateCustomerComponent, ConfirmDialogComponent } from './customerOperation/update-customer/update-customer.component';

import { DeleteFoodOrderComponent } from './foodOrderOperation/delete-food-order/delete-food-order.component';
import { ShoppingCartComponent } from './foodOrderOperation/shopping-cart/shopping-cart.component';
import { ViewPastFoodOrdersComponent } from './foodOrderOperation/view-past-food-orders/view-past-food-orders.component';

import { FoodItemMenuComponent } from './foodOrderOperation/food-item-menu/food-item-menu.component';
import { ViewFoodItemDetailComponent } from './foodOrderOperation/view-food-item-detail/view-food-item-detail.component';
import { CheckoutComponent } from './foodOrderOperation/checkout/checkout.component';

import { ViewReservationsComponent } from './reservationOperation/view-reservations/view-reservations.component';

import { SongListComponent } from './songOperation/song-list/song-list.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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

    ViewFoodItemDetailComponent,

    CheckoutComponent,

    CompanyInfoComponent,

    ViewReservationsComponent,

  ],
  imports: [
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
    SelectButtonModule,
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
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
