import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, Subject, switchMap } from 'rxjs';
import { ErrorMain } from '../interfaces/global.interface';
import { NameFirebaseUser, UserEmailAndNameAndId, UserFull, UserPasswordAndEmail, UserPasswordAndEmailAndName } from '../interfaces/user.interface';
import { ErrorService } from './error.service';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'https://course-work-auto-default-rtdb.europe-west1.firebasedatabase.app';
  private keyLocaleStorage: string = 'auth-token';
  public userSubject: BehaviorSubject<UserEmailAndNameAndId | null> = new BehaviorSubject<UserEmailAndNameAndId | null>(this.getUser());

  constructor(
    private http: HttpClient,
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public login(user: UserPasswordAndEmail): Observable<NameFirebaseUser> {
    return this.checkUserExists(user.email).pipe(
      switchMap(userBd => {
        if (userBd.exists === false) { // если email не совпадает
          throw ErrorService.createError(`
            Такого user не существует
            email: ${user.email}
          `);
        }
        if (user.password !== userBd.user?.password) {
          throw ErrorService.createError('Пароль не подходит')
        }
        const userEmailAndNameAndId: UserEmailAndNameAndId = {
          id: userBd.user.id,
          name: userBd.user.name,
          email: userBd.user.email
        };
        this.setUser(this.keyLocaleStorage, userEmailAndNameAndId);
        return of({name: userBd.user.id});
      })
    );
  }

  private checkUserExists(email: string): Observable<{exists: boolean, user: UserFull | null}> {
    return this.registerService.getUsers().pipe(
      map(users => {
        for (const user of users) {
          if (user.email === email) {
            return {
              exists: true,
              user: user
            }; // возвращает true, если user создан
          }
        }
        return {
          exists: false,
          user: null
        }; // возвращает false, если user не создан
      })
    );
  }

  private setUser(key: string, value: UserEmailAndNameAndId | null): void {
    this.userSubject.next(value);
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  private getUser(): UserEmailAndNameAndId | null {
    if (localStorage.getItem(this.keyLocaleStorage) !== null) {
      // надо сделать запрос в firebase, что такой user существует, только тогда возвращать true
      const stringJson: string = (localStorage.getItem(this.keyLocaleStorage) as string);
      return JSON.parse(stringJson);
    }
    return null;
  }

  public isAuthentificated(): boolean {
    return !!this.getUser();
  }

  public logout(): void {
    this.setUser(this.keyLocaleStorage, null);
    this.reloadCurrentPage();
  }

  private reloadCurrentPage() {
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
