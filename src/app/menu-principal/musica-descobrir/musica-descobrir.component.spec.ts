import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicaDescobrirComponent } from './musica-descobrir.component';

describe('MusicaDescobrirComponent', () => {
  let component: MusicaDescobrirComponent;
  let fixture: ComponentFixture<MusicaDescobrirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicaDescobrirComponent]
    });
    fixture = TestBed.createComponent(MusicaDescobrirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
