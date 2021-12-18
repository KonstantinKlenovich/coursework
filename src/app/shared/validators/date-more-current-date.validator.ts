import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

export const DateMoreCurrentDateValidator: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
  const date: any = control.value;
  if (!(date instanceof Date)) {
    return of({ date: false });
  }
  date as Date;
  if (dateMoreCurrentDate(date)) {
    return of(null);
  }
  return of ({ date: true });
};

const dateMoreCurrentDate = (date: Date): boolean => {
  const currentDate = new Date();
  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);
  return date.getTime() >= currentDate.getTime();
};
