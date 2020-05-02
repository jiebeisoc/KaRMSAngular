import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritePlaylistComponent } from './favourite-playlist.component';

describe('FavouritePlaylistComponent', () => {
  let component: FavouritePlaylistComponent;
  let fixture: ComponentFixture<FavouritePlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritePlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
