import { TestBed, inject } from '@angular/core/testing';

import { KhulnasoftService } from './khulnasoft.service';

describe('KhulnasoftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KhulnasoftService],
    });
  });

  it('should be created', inject([KhulnasoftService], (service: KhulnasoftService) => {
    expect(service).toBeTruthy();
  }));
});
