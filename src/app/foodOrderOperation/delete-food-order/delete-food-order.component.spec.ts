import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFoodOrderComponent } from './delete-food-order.component';

describe('DeleteFoodOrderComponent', () => {
  let component: DeleteFoodOrderComponent;
  let fixture: ComponentFixture<DeleteFoodOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFoodOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFoodOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
