import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEsqueceuSenhaComponent } from './usuario-esqueceu-senha.component';

describe('UsuarioEsqueceuSenhaComponent', () => {
  let component: UsuarioEsqueceuSenhaComponent;
  let fixture: ComponentFixture<UsuarioEsqueceuSenhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioEsqueceuSenhaComponent]
    });
    fixture = TestBed.createComponent(UsuarioEsqueceuSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
