import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacoesComponent } from './recomendacoes.component';

describe('RecomendacoesComponent', () => {
  let component: RecomendacoesComponent;
  let fixture: ComponentFixture<RecomendacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendacoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecomendacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
