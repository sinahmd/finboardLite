import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { TransactionService } from '../../../core/services/transaction.service';
import { TransactionFilter } from '../../../core/models/transaction.model';
import { JalaliDatepickerComponent } from '../../../shared/jalali-datepicker/jalali-datepicker.component';
import { PersianNumberPipe } from '../../../shared/pipes/persian-number.pipe';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JalaliDatepickerComponent, PersianNumberPipe],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit, OnDestroy {
  svc = inject(TransactionService);
  private fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''], status: ['all'], category: ['all'], type: ['all'],
      dateFrom: [''], dateTo: [''], amountMin: [null], amountMax: [null],
    });

    this.form.get('search')!.valueChanges.pipe(
      debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)
    ).subscribe(search => this.svc.setFilter({ search }));

    ['status','category','type','amountMin','amountMax'].forEach(field => {
      this.form.get(field)!.valueChanges.pipe(
        distinctUntilChanged(), takeUntil(this.destroy$)
      ).subscribe(value => this.svc.setFilter({ [field]: value } as Partial<TransactionFilter>));
    });

    // Date fields: datepicker emits Gregorian YYYY-MM-DD strings directly
    ['dateFrom', 'dateTo'].forEach(field => {
      this.form.get(field)!.valueChanges.pipe(
        distinctUntilChanged(), takeUntil(this.destroy$)
      ).subscribe(value => {
        this.svc.setFilter({ [field]: value ?? '' } as Partial<TransactionFilter>);
      });
    });
  }

  reset(): void {
    this.form.reset({
      search:'', status:'all', category:'all', type:'all',
      dateFrom:'', dateTo:'', amountMin:null, amountMax:null,
    });
    this.svc.resetFilter();
  }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
}
