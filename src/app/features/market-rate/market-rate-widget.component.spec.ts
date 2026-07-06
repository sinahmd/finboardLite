import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketRateWidgetComponent } from './market-rate-widget.component';
import { MarketRateService } from './market-rate.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MarketRateWidgetComponent', () => {
  let component: MarketRateWidgetComponent;
  let fixture: ComponentFixture<MarketRateWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketRateWidgetComponent, HttpClientTestingModule],
      providers: [MarketRateService]
    }).compileComponents();

    fixture = TestBed.createComponent(MarketRateWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading state initially', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.rate-widget')).toBeTruthy();
  });
});
