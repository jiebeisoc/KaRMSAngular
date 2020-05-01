import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPriceComponent } from './room-price.component';

describe('RoomPriceComponent', () => {
  let component: RoomPriceComponent;
  let fixture: ComponentFixture<RoomPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
