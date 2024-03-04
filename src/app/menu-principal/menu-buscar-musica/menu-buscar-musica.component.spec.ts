import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBuscarMusicaComponent } from './menu-buscar-musica.component';

describe('MenuBuscarMusicaComponent', () => {
  let component: MenuBuscarMusicaComponent;
  let fixture: ComponentFixture<MenuBuscarMusicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuBuscarMusicaComponent]
    });
    fixture = TestBed.createComponent(MenuBuscarMusicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
