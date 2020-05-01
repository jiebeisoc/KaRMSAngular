import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../session.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  constructor(public sessionService: SessionService) { }

  ngOnInit(): void {
  }

}
