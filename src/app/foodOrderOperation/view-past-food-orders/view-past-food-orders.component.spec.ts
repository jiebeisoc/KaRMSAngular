import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPastFoodOrdersComponent } from './view-past-food-orders.component';

describe('ViewPastFoodOrdersComponent', () => {
  let component: ViewPastFoodOrdersComponent;
  let fixture: ComponentFixture<ViewPastFoodOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPastFoodOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPastFoodOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
