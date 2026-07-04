import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { TransactionDetailComponent } from './transaction-detail.component';

describe('TransactionDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionDetailComponent, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TransactionDetailComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show back button', () => {
    const fixture = TestBed.createComponent(TransactionDetailComponent);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.back');
    expect(btn?.textContent).toContain('بازگشت');
  });

  it('should show not found when no transaction', () => {
    const fixture = TestBed.createComponent(TransactionDetailComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.empty')?.textContent).toContain('تراکنش یافت نشد');
  });
});
