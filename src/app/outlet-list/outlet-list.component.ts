import { Component, OnInit } from '@angular/core';

import { Outlet } from '../outlet';
import { OutletService } from '../outlet.service';

export class OutletView {
  outletName: string;
  outletAddress: string;
  outletPhone: string;
  operatingHour: string;

  constructor(outletName?: string, outletAddress?: string, outletPhone?: string, operatingHour?: string) {
    this.outletName = outletName;
    this.outletAddress = outletAddress;
    this.outletPhone = outletPhone;
    this.operatingHour = operatingHour;
  }
}

@Component({
  selector: 'app-outlet-list',
  templateUrl: './outlet-list.component.html',
  styleUrls: ['./outlet-list.component.css']
})
export class OutletListComponent implements OnInit {

  outlets: Outlet[];
  outletViews: OutletView[] = [];
  errorMessage: string;

  constructor(public outletService: OutletService) { }

  ngOnInit(): void {
    this.outletService.retrieveAllOutlets().subscribe(
      response => {
        this.outlets = response.outlets;
        console.log(this.outlets);
        for (let outlet of this.outlets) {
          let opening = new Date(outlet.openingHours.substring(0,20));
          let closing = new Date(outlet.closingHours.substring(0,20));

          let openingHour: string = opening.toString().substring(16,21);
          let closingHour: string = closing.toString().substring(16,21);

          let outletView: OutletView = new OutletView(outlet.outletName, outlet.outletAddress, outlet.outletPhone, openingHour + " ~ " + closingHour);
          this.outletViews.push(outletView);
        }
      },
        error => {
          this.errorMessage = error;
        }
    );
  }

}
