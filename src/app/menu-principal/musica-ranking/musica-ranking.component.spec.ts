import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MusicaRankingComponent } from './musica-ranking.component';


describe('MusicaRankingComponent', () => {
  let component: MusicaRankingComponent;
  let fixture: ComponentFixture<MusicaRankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicaRankingComponent]
    });
    fixture = TestBed.createComponent(MusicaRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
