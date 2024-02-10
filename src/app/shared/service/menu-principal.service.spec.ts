import { TestBed } from '@angular/core/testing';

import { MenuPrincipalService } from './menu-principal.service';

describe('MenuPrincipalService', () => {
  let service: MenuPrincipalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuPrincipalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
