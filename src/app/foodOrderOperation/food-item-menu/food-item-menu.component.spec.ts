import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemMenuComponent } from './food-item-menu.component';

describe('FoodItemMenuComponent', () => {
  let component: FoodItemMenuComponent;
  let fixture: ComponentFixture<FoodItemMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodItemMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodItemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
