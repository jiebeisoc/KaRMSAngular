import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

import { SessionService } from '../../session.service';


interface MenuNode {
  name: string;
  children?: MenuNode[];
  link?: string;
}

const TREE_DATA: MenuNode[] = [
  {
    name: 'Info',
    children: [
      {name: 'About', link: '/aboutUs'},
      {name: 'Locate Us', link: '/locateUs'},
      {name: 'Promotions', link: '/promotion'},
      {name: 'Price', link: '/price'},
    ]
  },
  {
    name: 'Reservation',
    children: [
      {name: 'View Available Rooms', link: '/index'},
      {name: 'Create Reservation', link: '/reservationOperation/createNewReservation'},
      {name: 'My Reservations', link: '/reservationOperation/viewReservations'}
    ]
  },
  {
    name: 'Food Ordering',
    children: [
      {name: 'Food Menu', link: '/foodOrderOperation/foodItemMenu'},
      {name: 'Shopping Cart', link: '/foodOrderOperation/shoppingCart'},
      {name: 'Past Food Orders', link: '/foodOrderOperation/viewPastFoodOrders'}
    ]
  },
  {
    name: 'Songs',
    children: [
      {name: 'Songs', link: '/songOperation/songList'},
      {name: 'My Favourite Playlist', link: 'songOperation/favouritePlaylist'}
    ]
  }
]

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router,
    public sessionService: SessionService) { 
      this.dataSource.data = TREE_DATA;
    }
  
  ngOnInit(): void {
    this.treeControl.expandAll();
  }

  public customerLogout(): void
	{
		this.sessionService.setIsLogin(false);
		this.sessionService.setCurrentCustomer(null);
		
		this.router.navigate(["/index"]);
  }

  navigateToPage(link: string) {
    this.router.navigate([link]);
  }
  
  private _transformer = (node: MenuNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      link: node.link,
      level: level,
    };
  } 

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;

  

}
