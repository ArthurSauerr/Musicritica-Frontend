import { TestBed } from '@angular/core/testing';

import { DadosCompartilhadosService } from './dados-compartilhados.service';

describe('DadosCompartilhadosService', () => {
  let service: DadosCompartilhadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosCompartilhadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
