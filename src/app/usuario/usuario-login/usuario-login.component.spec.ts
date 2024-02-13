import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioLoginComponent } from './usuario-login.component';

describe('UsuarioLoginComponent', () => {
  let component: UsuarioLoginComponent;
  let fixture: ComponentFixture<UsuarioLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioLoginComponent]
    });
    fixture = TestBed.createComponent(UsuarioLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
