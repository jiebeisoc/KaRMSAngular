import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService) { }

  ngOnInit(): void {
  }

  customerLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentCustomer(null);
    this.sessionService.setUsername(null);
    this.sessionService.setPassword(null);

    this.router.navigate(["/index"]);
  }

}
