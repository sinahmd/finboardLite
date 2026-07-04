import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterBarComponent } from './filter-bar.component';

describe('FilterBarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterBarComponent, ReactiveFormsModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FilterBarComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render filter form', () => {
    const fixture = TestBed.createComponent(FilterBarComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.filter-bar')).toBeTruthy();
    expect(el.querySelector('input[type="search"]')).toBeTruthy();
  });

  it('should have reset button', () => {
    const fixture = TestBed.createComponent(FilterBarComponent);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.reset-btn');
    expect(btn?.textContent).toContain('بازنشانی');
  });
});
