import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRedefinirSenhaComponent } from './usuario-redefinir-senha.component';

describe('UsuarioRedefinirSenhaComponent', () => {
  let component: UsuarioRedefinirSenhaComponent;
  let fixture: ComponentFixture<UsuarioRedefinirSenhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioRedefinirSenhaComponent]
    });
    fixture = TestBed.createComponent(UsuarioRedefinirSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
