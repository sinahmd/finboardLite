import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TransactionService } from '../../../core/services/transaction.service';
import { TransactionFilter } from '../../../core/models/transaction.model';
import { JalaliDatepickerComponent } from '../../../shared/jalali-datepicker/jalali-datepicker.component';
import { PersianNumberPipe } from '../../../shared/pipes/persian-number.pipe';

@Component({
  selector: 'app-filter-bar',
  imports: [ReactiveFormsModule, JalaliDatepickerComponent, PersianNumberPipe],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
})
export class FilterBarComponent implements OnInit {
  svc = inject(TransactionService);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''], status: ['all'], category: ['all'], type: ['all'],
      dateFrom: [''], dateTo: [''], amountMin: [null], amountMax: [null],
    });

    this.form.get('search')!.valueChanges.pipe(
      debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)
    ).subscribe(search => this.svc.setFilter({ search }));

    ['status','category','type','amountMin','amountMax'].forEach(field => {
      this.form.get(field)!.valueChanges.pipe(
        distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)
      ).subscribe(value => this.svc.setFilter({ [field]: value } as Partial<TransactionFilter>));
    });

    ['dateFrom', 'dateTo'].forEach(field => {
      this.form.get(field)!.valueChanges.pipe(
        distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)
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
}
