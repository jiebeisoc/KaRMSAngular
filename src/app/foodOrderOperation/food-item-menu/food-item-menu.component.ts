import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/food-item';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/session.service';
import { FoodOrderService } from 'src/app/food-order.service';

@Component({
  selector: 'app-food-item-menu',
  templateUrl: './food-item-menu.component.html',
  styleUrls: ['./food-item-menu.component.css']
})
export class FoodItemMenuComponent implements OnInit {

  public foodItems:FoodItem[];
  public display:boolean=false;
  


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public sessionService: SessionService,
              private foodOrderService:FoodOrderService
              ) { }

  ngOnInit(): void {

    this.foodOrderService.getFoodItems().subscribe(
      response => {
        this.foodItems = response.foodItemEntities;
      },
      error => {
        console.log('************************ CreateFoodOrderComponent.ts: '+error )
      }
    );
  }




  
}
