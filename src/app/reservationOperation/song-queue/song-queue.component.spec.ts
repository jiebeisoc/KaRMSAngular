import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongQueueComponent } from './song-queue.component';

describe('SongQueueComponent', () => {
  let component: SongQueueComponent;
  let fixture: ComponentFixture<SongQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
