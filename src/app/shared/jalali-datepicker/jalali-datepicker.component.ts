import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'jalali-moment';
import { JALALI_MONTHS, JALALI_WEEKDAYS } from '../utils/jalali';
import { toPersianNumber } from '../utils/persian-number';

interface CalendarDay {
  date: moment.Moment;
  day: number;
  currentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

@Component({
  selector: 'app-jalali-datepicker',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JalaliDatepickerComponent),
      multi: true,
    }
  ],
  template: `
    <div class="dp-container">
      <input
        class="dp-input"
        [value]="displayValue"
        (click)="open = !open"
        (keydown.enter)="open = !open"
        [placeholder]="placeholder"
        readonly
      />
      <span class="dp-icon">📅</span>

      @if (open) {
        <div class="dp-overlay" (click)="close()"></div>
        <div class="dp-calendar">
          <div class="dp-header">
            <button class="dp-nav" (click)="prevMonth()">‹</button>
            <div class="dp-title">
              {{ JALALI_MONTHS[currentMonth] }} {{ toPersianNumber(currentYear) }}
            </div>
            <button class="dp-nav" (click)="nextMonth()">›</button>
          </div>

          <div class="dp-weekdays">
            @for (wd of JALALI_WEEKDAYS; track wd) {
              <div class="dp-wd">{{ wd }}</div>
            }
          </div>

          <div class="dp-days">
            @for (day of calendarDays; track $index) {
              <button
                class="dp-day"
                [class.other]="!day.currentMonth"
                [class.today]="day.isToday"
                [class.selected]="day.isSelected"
                (click)="selectDay(day)"
              >{{ toPersianNumber(day.day) }}</button>
            }
          </div>

          <div class="dp-footer">
            <button class="dp-today-btn" (click)="goToday()">امروز</button>
            <button class="dp-clear-btn" (click)="clear()">پاک کردن</button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: inline-block; width: 100%; }
    .dp-container { position: relative; width: 100%; }
    .dp-input {
      width: 100%;
      padding: .45rem 2.2rem .45rem .75rem;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--bg);
      color: var(--text);
      font-size: .875rem;
      font-family: inherit;
      direction: ltr;
      text-align: center;
      cursor: pointer;
      outline: none;
      transition: border-color .15s;
    }
    .dp-input:focus { border-color: var(--primary); }
    .dp-icon {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      font-size: .85rem;
      pointer-events: none;
    }
    .dp-overlay {
      position: fixed;
      inset: 0;
      z-index: 999;
    }
    .dp-calendar {
      position: absolute;
      top: calc(100% + 4px);
      right: 0;
      z-index: 1000;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,.15);
      padding: .75rem;
      min-width: 280px;
      font-family: 'Vazirmatn', sans-serif;
    }
    .dp-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: .5rem;
      padding: 0 .25rem;
    }
    .dp-title {
      font-size: .85rem;
      font-weight: 700;
      color: var(--text);
      text-align: center;
      flex: 1;
    }
    .dp-nav {
      width: 28px;
      height: 28px;
      border: 1px solid var(--border);
      border-radius: 6px;
      background: transparent;
      color: var(--text);
      font-size: .9rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background .1s;
    }
    .dp-nav:hover { background: var(--hover); }
    .dp-weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
      margin-bottom: .25rem;
    }
    .dp-wd {
      text-align: center;
      font-size: .65rem;
      font-weight: 700;
      color: var(--muted);
      padding: .25rem 0;
    }
    .dp-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
    }
    .dp-day {
      width: 100%;
      aspect-ratio: 1;
      border: none;
      border-radius: 6px;
      background: transparent;
      color: var(--text);
      font-size: .78rem;
      font-family: 'Vazirmatn', sans-serif;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background .1s;
    }
    .dp-day:hover { background: var(--hover); }
    .dp-day.other { color: var(--muted); opacity: .4; }
    .dp-day.today {
      border: 2px solid var(--primary);
      font-weight: 700;
    }
    .dp-day.selected {
      background: var(--primary) !important;
      color: #fff !important;
      font-weight: 700;
    }
    .dp-footer {
      display: flex;
      justify-content: space-between;
      margin-top: .5rem;
      padding-top: .5rem;
      border-top: 1px solid var(--border);
    }
    .dp-today-btn, .dp-clear-btn {
      padding: .3rem .75rem;
      border: 1px solid var(--border);
      border-radius: 6px;
      background: transparent;
      font-size: .75rem;
      font-family: 'Vazirmatn', sans-serif;
      cursor: pointer;
      color: var(--text);
      transition: background .1s;
    }
    .dp-today-btn:hover { background: var(--hover); }
    .dp-clear-btn:hover { background: var(--danger-bg); color: var(--danger); }
  `]
})
export class JalaliDatepickerComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'YYYY/MM/DD';
  @Output() dateChange = new EventEmitter<string>();

  JALALI_MONTHS = JALALI_MONTHS;
  JALALI_WEEKDAYS = JALALI_WEEKDAYS;
  toPersianNumber = toPersianNumber;

  open = false;
  displayValue = '';
  jalaliValue = '';
  currentYear!: number;
  currentMonth!: number;
  calendarDays: CalendarDay[] = [];

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    const now = moment();
    this.currentYear = now.jYear();
    this.currentMonth = now.jMonth();
    this.buildCalendar();
  }

  writeValue(value: string): void {
    if (value) {
      // value is Gregorian YYYY-MM-DD string from the form
      const m = moment(value, 'YYYY-MM-DD', true);
      if (m.isValid()) {
        this.jalaliValue = m.format('jYYYY/jMM/jDD');
        this.displayValue = toPersianNumber(this.jalaliValue);
        this.currentYear = m.jYear();
        this.currentMonth = m.jMonth();
      } else {
        // Maybe it's already Jalali
        const jm = moment(value, 'jYYYY/jMM/jDD', true);
        if (jm.isValid()) {
          this.jalaliValue = value;
          this.displayValue = toPersianNumber(value);
          this.currentYear = jm.jYear();
          this.currentMonth = jm.jMonth();
        }
      }
    } else {
      this.jalaliValue = '';
      this.displayValue = '';
    }
    this.buildCalendar();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  close(): void {
    this.open = false;
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.buildCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.buildCalendar();
  }

  selectDay(day: CalendarDay): void {
    if (!day.currentMonth) return;
    this.jalaliValue = day.date.format('jYYYY/jMM/jDD');
    this.displayValue = toPersianNumber(this.jalaliValue);

    // Convert to Gregorian for the form value
    const gregorianStr = day.date.format('YYYY-MM-DD');
    this.onChange(gregorianStr);
    this.dateChange.emit(gregorianStr);
    this.open = false;
  }

  goToday(): void {
    const today = moment();
    this.currentYear = today.jYear();
    this.currentMonth = today.jMonth();
    this.selectDay({
      date: today,
      day: today.jDate(),
      currentMonth: true,
      isToday: true,
      isSelected: false,
    });
  }

  clear(): void {
    this.jalaliValue = '';
    this.displayValue = '';
    this.onChange('');
    this.dateChange.emit('');
    this.open = false;
  }

  private buildCalendar(): void {
    const today = moment();
    const firstDay = moment().jYear(this.currentYear).jMonth(this.currentMonth).jDate(1);
    const startWeekday = firstDay.day(); // 0=Sat, 1=Sun, ...

    // Days in current Jalali month
    const daysInMonth = firstDay.jDaysInMonth();

    // Previous month's trailing days
    const prevMonth = firstDay.clone().jDate(0);
    const daysInPrevMonth = prevMonth.jDaysInMonth();

    const selectedDate = this.jalaliValue
      ? moment(this.jalaliValue, 'jYYYY/jMM/jDD', true)
      : null;

    const days: CalendarDay[] = [];

    // Previous month trailing days
    for (let i = startWeekday - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const date = prevMonth.clone().jDate(d);
      days.push({
        date,
        day: d,
        currentMonth: false,
        isToday: false,
        isSelected: false,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const date = moment().jYear(this.currentYear).jMonth(this.currentMonth).jDate(d);
      const isToday = date.isSame(today, 'day');
      const isSelected = selectedDate ? date.isSame(selectedDate, 'day') : false;
      days.push({
        date,
        day: d,
        currentMonth: true,
        isToday,
        isSelected,
      });
    }

    // Next month leading days (fill to complete the grid)
    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
      const nextMonth = firstDay.clone().jMonth(this.currentMonth + 1);
      for (let d = 1; d <= remaining; d++) {
        const date = nextMonth.clone().jDate(d);
        days.push({
          date,
          day: d,
          currentMonth: false,
          isToday: false,
          isSelected: false,
        });
      }
    }

    this.calendarDays = days;
  }
}
