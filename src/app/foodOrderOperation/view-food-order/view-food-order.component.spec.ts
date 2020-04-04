import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFoodOrderComponent } from './view-food-order.component';

describe('ViewFoodOrderComponent', () => {
  let component: ViewFoodOrderComponent;
  let fixture: ComponentFixture<ViewFoodOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFoodOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFoodOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
