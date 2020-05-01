import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { RoomRate } from '../../room-rate';
import { RoomType } from '../../room-type';
import { RoomRateService } from '../../room-rate.service';
import { RoomTypeService } from '../../room-type.service';
import { SessionService } from '../../session.service';


export class RateView {
  type: string;
  wkDayPeak: string;
  wkDayHappy: string;
  wkEndPeak: string;
  wkEndHappy: string;

  constructor(type?: string, wkDayPeak?: string, wkDayHappy?: string, wkEndPeak?: string, wkEndHappy?: string) {
    this.type = type;
    this.wkDayPeak = wkDayPeak;
    this.wkDayHappy = wkDayHappy;
    this.wkEndPeak = wkEndPeak;
    this.wkEndHappy = wkEndHappy;
  }
}

@Component({
  selector: 'app-room-price',
  templateUrl: './room-price.component.html',
  styleUrls: ['./room-price.component.css']
})
export class RoomPriceComponent implements OnInit {

  roomRates: RoomRate[];
  roomTypes: RoomType[];
  rateViews: RateView[] = [];

  displayedColumns: string[] = ['type', 'wkDayHappy', 'wkDayPeak', 'wkEndHappy', 'wkEndPeak'];
  data = new MatTableDataSource();

  constructor(public roomRateService: RoomRateService,
    public roomTypeService: RoomTypeService,
    public sessionService: SessionService) { }

  ngOnInit(): void {

    this.roomTypeService.retrieveAllRoomType().subscribe(
      response => {
        this.roomTypes = response.roomTypes;

        for (let roomType of this.roomTypes) {
          let rateView: RateView = new RateView(roomType.name);

          this.rateViews.push(rateView);
        }

        this.roomRateService.retrieveAllRoomRate().subscribe(
          response => {
            this.roomRates = response.roomRates;
            for (let i = 0; i < this.roomTypes.length; i++) {
              for (let roomRate of this.roomRates) {
                if (roomRate.roomType != null && roomRate.roomType.name == this.rateViews[i].type) {
                  if (roomRate.roomRateType == 'WKDAYPEAK') {
                    this.rateViews[i].wkDayPeak = '$' + (Math.round(roomRate.rate * 100) / 100).toFixed(2);
                  } else if (roomRate.roomRateType == 'WKDAYNONPEAK') {
                    this.rateViews[i].wkDayHappy = '$' + (Math.round(roomRate.rate * 100) / 100).toFixed(2);
                  } else if (roomRate.roomRateType == 'WKENDPEAK') {
                    this.rateViews[i].wkEndPeak = '$' + (Math.round(roomRate.rate * 100) / 100).toFixed(2);
                  } else {
                    this.rateViews[i].wkEndHappy = '$' + (Math.round(roomRate.rate * 100) / 100).toFixed(2);
                  }
                }
              }            
            }  
            this.data = new MatTableDataSource(this.rateViews);  
          }
        );
      }
    );    
  }

}
