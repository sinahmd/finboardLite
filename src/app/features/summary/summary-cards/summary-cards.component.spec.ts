import { TestBed } from '@angular/core/testing';
import { SummaryCardsComponent } from './summary-cards.component';

describe('SummaryCardsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCardsComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SummaryCardsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render 4 skeleton cards while loading', () => {
    const fixture = TestBed.createComponent(SummaryCardsComponent);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('.card');
    expect(cards.length).toBe(4);
  });

  it('should show deposit label after loading', () => {
    const fixture = TestBed.createComponent(SummaryCardsComponent);
    fixture.detectChanges();
    const labels = fixture.nativeElement.querySelectorAll('.card__label');
    expect(fixture.componentInstance).toBeTruthy();
  });
});
