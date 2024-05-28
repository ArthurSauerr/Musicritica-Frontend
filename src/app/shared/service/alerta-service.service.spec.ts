import { TestBed } from '@angular/core/testing';

import { AlertaServiceService } from './alerta-service.service';

describe('AlertaServiceService', () => {
  let service: AlertaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
