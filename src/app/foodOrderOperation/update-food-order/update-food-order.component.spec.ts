import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFoodOrderComponent } from './update-food-order.component';

describe('UpdateFoodOrderComponent', () => {
  let component: UpdateFoodOrderComponent;
  let fixture: ComponentFixture<UpdateFoodOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFoodOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFoodOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
