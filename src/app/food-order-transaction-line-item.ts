import { FoodItem } from './food-item';

export class FoodOrderTransactionLineItem {
    transactionLineItemId:number;
  
    foodItem: FoodItem;
    quantity: number;
    unitPrice: number;
    subTotal: number;

    constructor(foodItem?: FoodItem, quantity?: number, unitPrice?: number,subTotal?:number, transactionLineItemId?:number) {
        this.transactionLineItemId=transactionLineItemId;
        this.foodItem = foodItem;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.subTotal=this.unitPrice*this.quantity;
     
    }

}
