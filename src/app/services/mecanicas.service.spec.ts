import { TestBed } from '@angular/core/testing';

import { MecanicasService } from './mecanicas.service';

describe('MecanicasService', () => {
  let service: MecanicasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MecanicasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
