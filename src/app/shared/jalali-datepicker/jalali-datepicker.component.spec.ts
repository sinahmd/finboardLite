import { TestBed } from '@angular/core/testing';
import { JalaliDatepickerComponent } from './jalali-datepicker.component';

describe('JalaliDatepickerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JalaliDatepickerComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(JalaliDatepickerComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render input', () => {
    const fixture = TestBed.createComponent(JalaliDatepickerComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.dp-input')).toBeTruthy();
  });

  it('should open calendar on click', () => {
    const fixture = TestBed.createComponent(JalaliDatepickerComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.dp-input').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.dp-calendar')).toBeTruthy();
  });
});
