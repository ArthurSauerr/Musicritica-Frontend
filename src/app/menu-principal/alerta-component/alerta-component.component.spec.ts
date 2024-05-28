import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaComponentComponent } from './alerta-component.component';

describe('AlertaComponentComponent', () => {
  let component: AlertaComponentComponent;
  let fixture: ComponentFixture<AlertaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertaComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
