import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFoodItemDetailComponent } from './view-food-item-detail.component';

describe('ViewFoodItemDetailComponent', () => {
  let component: ViewFoodItemDetailComponent;
  let fixture: ComponentFixture<ViewFoodItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFoodItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFoodItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
