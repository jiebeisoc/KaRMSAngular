import { FoodItem } from './food-item';

export class FoodOrderTransactionLineItem {
    transactionLineItemId:number;
  
    foodItem: FoodItem;
    quantity: number;
    unitPrice: number;
    subTotal: number;

    constructor(transactionLineItemId?:number, foodItem?: FoodItem, quantity?: number, unitPrice?: number,subTotal?:number) {
        this.transactionLineItemId=transactionLineItemId;
        this.foodItem = foodItem;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.subTotal=subTotal;
     
    }

}
