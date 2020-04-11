import { FoodItemCategory } from './food-item-category';

export class FoodItem {
   foodItemId:number;
   name:string;
   description:string;
   quantityOnHand:number;
   skuCode:string;
   unitPrice:number;
   foodItemRating:number;
   categoryEntity:FoodItemCategory;


   constructor(foodItemId?:number, name?:string, description?:string, quantityOnHand?:number, skuCode?:string, unitPrice?:number, foodItemRating?:number, categoryEntity?:FoodItemCategory){
        this.foodItemId=foodItemId;
        this.name=name;
        this.description=description;
        this.quantityOnHand=quantityOnHand;
        this.skuCode = skuCode;
        this.unitPrice=unitPrice;
        this.foodItemRating=foodItemRating;
        this.categoryEntity=categoryEntity;
    }
 

    
}
