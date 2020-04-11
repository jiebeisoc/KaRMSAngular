import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShoppingCartComponent } from './update-shopping-cart.component';

describe('UpdateShoppingCartComponent', () => {
  let component: UpdateShoppingCartComponent;
  let fixture: ComponentFixture<UpdateShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateShoppingCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
