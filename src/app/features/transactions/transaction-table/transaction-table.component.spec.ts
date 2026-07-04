import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionTableComponent } from './transaction-table.component';

describe('TransactionTableComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionTableComponent, RouterTestingModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TransactionTableComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render table headers', () => {
    const fixture = TestBed.createComponent(TransactionTableComponent);
    fixture.detectChanges();
    const ths = fixture.nativeElement.querySelectorAll('th');
    expect(ths.length).toBe(8);
  });

  it('should render pagination', () => {
    const fixture = TestBed.createComponent(TransactionTableComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.pager')).toBeTruthy();
  });
});
