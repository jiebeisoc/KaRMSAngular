import { TestBed } from '@angular/core/testing';

import { RoomRateService } from './room-rate.service';

describe('RoomRateService', () => {
  let service: RoomRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
