import { TestBed } from '@angular/core/testing';

import { WatchProviderService } from './watch-provider.service';

describe('WatchProviderService', () => {
  let service: WatchProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
