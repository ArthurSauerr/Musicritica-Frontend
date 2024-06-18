import { TestBed } from '@angular/core/testing';

import { DenunciaServiceService } from './denuncia-service.service';

describe('DenunciaServiceService', () => {
  let service: DenunciaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenunciaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
