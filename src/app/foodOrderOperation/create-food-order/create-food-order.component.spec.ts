import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFoodOrderComponent } from './create-food-order.component';

describe('CreateFoodOrderComponent', () => {
  let component: CreateFoodOrderComponent;
  let fixture: ComponentFixture<CreateFoodOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFoodOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFoodOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
