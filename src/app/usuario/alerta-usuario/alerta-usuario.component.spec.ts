import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaUsuarioComponent } from './alerta-usuario.component';

describe('AlertaUsuarioComponent', () => {
  let component: AlertaUsuarioComponent;
  let fixture: ComponentFixture<AlertaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertaUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
