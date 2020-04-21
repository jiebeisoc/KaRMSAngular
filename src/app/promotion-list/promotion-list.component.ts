import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { Promotion } from '../promotion';
import { PromotionService } from '../promotion.service'; 

export class PromotionView {
  promotionName: string;
  discountRate: string;
  validity: string;

  constructor(promotionName?: string, discountRate?: string, validity?: string) {
    this.promotionName = promotionName;
    this.discountRate = discountRate;
    this.validity = validity;
  }
}

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.css'],
  providers: [DatePipe]
})
export class PromotionListComponent implements OnInit {

  promotions: Promotion[];
  promotionViews: PromotionView[] = [];
  errorMessage: string;

  displayedColumns: string[] = ['promotionName', 'discountRate', 'validity'];
  data = new MatTableDataSource();

  constructor(public promotionService: PromotionService,
    public datePipe: DatePipe) { }

  ngOnInit(): void {

    this.promotionService.retrievePromotions().subscribe(
      response => {
        this.promotions = response.promotions;
        for (let promotion of this.promotions) {

          let discount: number = promotion.discountRate * 100;

          let validFrom: string = promotion.validFrom.toString().substring(0,10);
          let validTo: string = promotion.validUntil.toString().substring(0,10);

          let promotionView: PromotionView = new PromotionView(promotion.promotionName, discount+"%", validFrom + " ~ " + validTo);

          this.promotionViews.push(promotionView);
        }
        this.data = new MatTableDataSource(this.promotionViews);
      },
      error => {
        this.errorMessage = error;
      }
    );

  }

}
