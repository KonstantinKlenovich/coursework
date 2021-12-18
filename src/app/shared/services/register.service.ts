import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { NameFirebaseUser, UserFirebase, UserFull, UserPasswordAndEmailAndName } from '../interfaces/user.interface';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService  {

  private url: string = 'https://course-work-auto-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<UserFull[]> {
    return this.http.get<UserFirebase>(`${this.url}/users.json`).pipe(
      map(obj => {     
        const arr: UserFull[] = [];
        for (const key in obj) {
          const newObj: UserFull = Object.assign({'id': key}, obj[key]); 
          arr.push(newObj);
        }
        return arr;
      })
    );
  }

  public addUser(user: UserPasswordAndEmailAndName): Observable<NameFirebaseUser> {
    return this.checkUserExists(user.email).pipe(
      tap(item => {
        if (item === true) { // если user создан
          throw ErrorService.createError('Пользователь с таким email уже существует');
        }
      }),
      switchMap(item => this.http.post<NameFirebaseUser>(`${this.url}/users.json`, user))
    );
  }

  private checkUserExists(email: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        for (const user of users) {
          if (user.email === email) {
            return true; // возвращает true, если user создан
          }
        }
        return false; // возвращает false, если user не создан
      })
    );
  }

}
