import { BehaviorSubject, Observable, Subject } from 'rxjs';

export function convertObservableToBehaviorSubject<T>(
  observable: Observable<T>,
  initValue: T
): BehaviorSubject<T> {
  const subject = new BehaviorSubject<T>(initValue);

  observable.subscribe({
    next: (x: T) => {
      subject.next(x);
    },
    error: (err: any) => {
      subject.error(err);
    },
    complete: () => {
      subject.complete();
    },
  });

  return subject;
}
