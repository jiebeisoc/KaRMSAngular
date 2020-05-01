import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPointsComponent } from './membership-points.component';

describe('MembershipPointsComponent', () => {
  let component: MembershipPointsComponent;
  let fixture: ComponentFixture<MembershipPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
