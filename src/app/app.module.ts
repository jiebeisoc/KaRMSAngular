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

import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { RegisterCustomerComponent } from './customerOperation/register-customer/register-customer.component';
import { UpdateCustomerComponent } from './customerOperation/update-customer/update-customer.component';
import { CreateFoodOrderComponent } from './foodOrderOperation/create-food-order/create-food-order.component';
import { DeleteFoodOrderComponent } from './foodOrderOperation/delete-food-order/delete-food-order.component';
import { UpdateFoodOrderComponent } from './foodOrderOperation/update-food-order/update-food-order.component';
import { ViewFoodOrderComponent } from './foodOrderOperation/view-food-order/view-food-order.component';


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
    CreateFoodOrderComponent,
    UpdateFoodOrderComponent,
    ViewFoodOrderComponent,
    DeleteFoodOrderComponent,
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
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
