import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicasListagemComponent } from './musicas-listagem.component';

describe('MusicasListagemComponent', () => {
  let component: MusicasListagemComponent;
  let fixture: ComponentFixture<MusicasListagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicasListagemComponent]
    });
    fixture = TestBed.createComponent(MusicasListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
