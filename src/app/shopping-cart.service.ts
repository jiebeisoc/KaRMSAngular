import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { FoodOrderTransactionLineItem } from './food-order-transaction-line-item';
import { FoodOrderTransaction } from './food-order-transaction';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  foodOrderTrancationLineItems: FoodOrderTransactionLineItem[];
  foodOrderTransactionToView: FoodOrderTransactionLineItem;
  totalLineItem: number = 0;
  totalQuantity: number = 0;
  totalAmount: number = 0;      


  constructor(private sessionService: SessionService) {
    this.foodOrderTrancationLineItems = new Array();
  }


  setFoodOrderTransactionLineItems(foodOderTransactionLineItem: FoodOrderTransactionLineItem[]) {
    this.foodOrderTrancationLineItems = foodOderTransactionLineItem;
  }
  getFoodOrderTransactionLineItems() {
    return this.foodOrderTrancationLineItems;
  }

  createNewFoodOrderTransactionLineItem(newFoodOrderTransactionLineItem: FoodOrderTransactionLineItem){
   
    this.totalAmount+=newFoodOrderTransactionLineItem.subTotal;
    this.totalLineItem++;
    this.totalQuantity+=newFoodOrderTransactionLineItem.quantity;

    let foodOderTransactionLineItem: FoodOrderTransactionLineItem=new FoodOrderTransactionLineItem();
    foodOderTransactionLineItem.foodItem=newFoodOrderTransactionLineItem.foodItem;
    foodOderTransactionLineItem.quantity=newFoodOrderTransactionLineItem.quantity;
    foodOderTransactionLineItem.unitPrice=newFoodOrderTransactionLineItem.unitPrice;
    foodOderTransactionLineItem.subTotal=newFoodOrderTransactionLineItem.subTotal;
    this.foodOrderTrancationLineItems.push(foodOderTransactionLineItem);
  }

  editLineItem(lineItem:FoodOrderTransactionLineItem){
    this.totalQuantity = 0;
    this.totalAmount=0;
  
 
    for(var i: number = 0; i < this.foodOrderTrancationLineItems.length; i++)
    {
        this.totalQuantity=this.totalQuantity+this.foodOrderTrancationLineItems[i].quantity;
        this.totalAmount=this.totalAmount+this.foodOrderTrancationLineItems[i].subTotal;
    }

  
  }

  deleteLineItem(lineItem:FoodOrderTransactionLineItem){

    for(var i: number = 0; i < this.foodOrderTrancationLineItems.length; i++){
      if(this.foodOrderTrancationLineItems[i].foodItem.foodItemId==lineItem.foodItem.foodItemId){
        this.totalQuantity=this.totalQuantity-this.foodOrderTrancationLineItems[i].quantity;
        this.totalAmount=this.totalAmount-this.foodOrderTrancationLineItems[i].subTotal;
        this.totalLineItem--;
        this.foodOrderTrancationLineItems.splice(i,1);
      }
    }


  }

  clearCart(){
  this.foodOrderTrancationLineItems = new Array();
  this.totalLineItem = 0;
  this.totalQuantity = 0;
  this.totalAmount = 0;
  }

  checkOut(newTransaction:FoodOrderTransaction){
    newTransaction.foodOrderTransactionLineItemEntities=this.foodOrderTrancationLineItems;
    newTransaction.totalAmount=this.totalAmount;
    newTransaction.totalLineItem=this.totalLineItem;
    newTransaction.totalQuantity = this.totalQuantity;
    newTransaction.customerEntity=this.sessionService.getCurrentCustomer();
    newTransaction.transactionDateTime= new Date();

    
  }








}

