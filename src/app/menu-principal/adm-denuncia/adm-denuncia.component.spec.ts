import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmDenunciaComponent } from './adm-denuncia.component';

describe('AdmDenunciaComponent', () => {
  let component: AdmDenunciaComponent;
  let fixture: ComponentFixture<AdmDenunciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmDenunciaComponent]
    });
    fixture = TestBed.createComponent(AdmDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
