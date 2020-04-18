import { Injectable } from '@angular/core';

import { Customer } from './customer';
import { FoodOrderTransactionLineItem } from './food-order-transaction-line-item';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getIsLogin(): boolean {
    if (sessionStorage.isLogin == "true") {
      return true;
    } else {
      return false;
    }
  }

  setIsLogin(isLogin: boolean): void {
    sessionStorage.isLogin = isLogin;
  }

  getCurrentCustomer(): Customer {
    return JSON.parse(sessionStorage.currentCustomer);
  }

  setCurrentCustomer(currentCustomer: Customer): void {
    sessionStorage.currentCustomer = JSON.stringify(currentCustomer);
  }

  getUsername(): string {
    return sessionStorage.username;
  }

  setUsername(username: string) {
    sessionStorage.username = username;
  }

  getPassword(): string {
    return sessionStorage.password;
  }

  setPassword(password: string): void {
    sessionStorage.password = password;
  }

  checkAccessRight(path): boolean {
    if (this.getIsLogin) {
      return true;
    } else {
      return false;
    }
  }
  setShoppingCart(shoppingCart: FoodOrderTransactionLineItem[]): void {
    sessionStorage.currentShoppingCart = JSON.stringify(shoppingCart);

  }

  getShoppingCart(): FoodOrderTransactionLineItem[] {
    try{
      return JSON.parse(sessionStorage.currentShoppingCart);
    } catch {
      alert("Error");
      let a:FoodOrderTransactionLineItem[] = new Array();
      return a;
    }
   
  }

  getTotalLineItem(): number {
    return sessionStorage.totalLineItem;
  }

  setTotalLineItem(totalLineItem: number) {
    sessionStorage.totalLineItem = totalLineItem;
  }

  getTotalQuantity(): number {
    return sessionStorage.totalQuantity;
  }

  setTotalQuantity(totalQuantity: number) {
    sessionStorage.totalQuantity = totalQuantity;
  }

  getTotalAmount(): number {
    return sessionStorage.totalAmount;
  }

  setTotalAmount(totalAmount: number) {
    sessionStorage.totalAmount = totalAmount;
  }

}
