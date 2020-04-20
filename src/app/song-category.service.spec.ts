import { TestBed } from '@angular/core/testing';

import { SongCategoryService } from './song-category.service';

describe('SongCategoryService', () => {
  let service: SongCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
