import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { FoodOrderTransactionLineItem } from './food-order-transaction-line-item';

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
    this.sessionService.setShoppingCart(foodOderTransactionLineItem);
  }
  getFoodOrderTransactionLineItems() {
    this.sessionService.getShoppingCart();
  }

  createNewFoodOrderTransactionLineItem(newFoodOrderTransactionLineItem: FoodOrderTransactionLineItem){
    //retrieve data from local storage 
    this.foodOrderTrancationLineItems=this.sessionService.getShoppingCart();
    this.totalAmount=this.sessionService.getTotalAmount();
    this.totalLineItem = this.sessionService.getTotalLineItem();
    this.totalQuantity=this.sessionService.getTotalQuantity();

  
    let foodOderTransactionLineItem: FoodOrderTransactionLineItem=new FoodOrderTransactionLineItem();
    foodOderTransactionLineItem.foodItem=newFoodOrderTransactionLineItem.foodItem;
    foodOderTransactionLineItem.quantity=newFoodOrderTransactionLineItem.quantity;
    foodOderTransactionLineItem.unitPrice=newFoodOrderTransactionLineItem.unitPrice;

    //update Shopping cart
    ++this.totalLineItem;
    let subTotal:number = newFoodOrderTransactionLineItem.quantity*newFoodOrderTransactionLineItem.unitPrice;
    foodOderTransactionLineItem.subTotal=subTotal;
    this.totalQuantity=this.totalQuantity+newFoodOrderTransactionLineItem.quantity;
    this.totalAmount=subTotal+this.totalAmount;
    this.foodOrderTrancationLineItems.push(foodOderTransactionLineItem);

    //Store back to local storage
    
    this.sessionService.setShoppingCart(this.foodOrderTrancationLineItems);
    this.sessionService.setTotalAmount(this.totalAmount);
    this.sessionService.setTotalLineItem(this.totalLineItem);
    this.sessionService.setTotalQuantity(this.totalQuantity);
  }

  editLineItem(lineItem:FoodOrderTransactionLineItem){
    this.foodOrderTrancationLineItems=this.sessionService.getShoppingCart();
    this.totalAmount=this.sessionService.getTotalAmount();
    this.totalQuantity=this.sessionService.getTotalQuantity();


    for(var i: number = 0; i < this.foodOrderTrancationLineItems.length; i++){
      if(this.foodOrderTrancationLineItems[i].foodItem.foodItemId==lineItem.foodItem.foodItemId){
        this.totalQuantity=this.totalQuantity-this.foodOrderTrancationLineItems[i].quantity+lineItem.quantity;
        this.totalAmount=this.totalAmount-this.foodOrderTrancationLineItems[i].subTotal=lineItem.subTotal;
        
        this.foodOrderTrancationLineItems[i].subTotal=lineItem.subTotal;
        this.foodOrderTrancationLineItems[i].quantity=lineItem.quantity;
      }
    }

    this.sessionService.setShoppingCart(this.foodOrderTrancationLineItems);
    this.sessionService.setTotalQuantity(this.totalQuantity);
    this.sessionService.setTotalAmount(this.totalAmount);  
  }

  deleteLineItem(lineItem:FoodOrderTransactionLineItem){
    this.foodOrderTrancationLineItems=this.sessionService.getShoppingCart();
    this.totalAmount=this.sessionService.getTotalAmount();
    this.totalQuantity=this.sessionService.getTotalQuantity();

   

    for(var i: number = 0; i < this.foodOrderTrancationLineItems.length; i++){
      if(this.foodOrderTrancationLineItems[i].foodItem.foodItemId==lineItem.foodItem.foodItemId){
        this.totalQuantity=this.totalQuantity-this.foodOrderTrancationLineItems[i].quantity;
        this.totalAmount=this.totalAmount-this.foodOrderTrancationLineItems[i].subTotal;
    
        this.foodOrderTrancationLineItems.splice(i,1);
      }
    }

    this.sessionService.setShoppingCart(this.foodOrderTrancationLineItems);
    this.sessionService.setTotalQuantity(this.totalQuantity);
    this.sessionService.setTotalAmount(this.totalAmount);  
  }






  }
}
