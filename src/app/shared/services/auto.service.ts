import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AutoFirebase, AutoWithId } from '../interfaces/auto.interface';

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  private url: string = 'https://course-work-auto-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) { }

  public getAllAuto(): Observable<AutoWithId[]> {
    return this.http.get<AutoFirebase>(`${this.url}/cars.json`).pipe(
      map(obj => {
        const arr: AutoWithId[] = [];
        for (const key in obj) {
          const newObj: AutoWithId = Object.assign({'id': key}, obj[key]); 
          arr.push(newObj);
        }
        return arr;
      })
    );
  }

  public filterAutoByName(auto: AutoWithId[], name: string): AutoWithId[] {
    if (name === '') {
      return auto;
    }

    name = convertStrSearch(name, '');

    return auto.filter(item => {
      const itemName = item.name.toLowerCase();
      // console.log(itemName, 'itemName');
      // console.log(name, 'name');
      
      return itemName.indexOf(name) !== - 1 ? true : false;
    });
  }

}


const convertStrSearch = (strSearch: string, symbol: string): string => {

  strSearch = strSearch.toLowerCase();
  let arrStr: string[] = strSearch.split('');

  const deletingCharactersAtBegin = (arrStr: string[], symbol: string): string[] => {
    let start: boolean = true;
    for (let i = 0; i < arrStr.length; i++) {
      if (arrStr[i] === symbol && start === true) {
        arrStr.splice(i, 1);
        i--;
        continue;
      }
      start = false;
    }
    return arrStr;
  };

  arrStr = deletingCharactersAtBegin(arrStr, symbol);
  arrStr = arrStr.reverse();
  arrStr = deletingCharactersAtBegin(arrStr, symbol);
  arrStr = arrStr.reverse();
  arrStr = arrStr.join('').split(' ');
  arrStr = arrStr.filter(item => item !== '');
  arrStr = arrStr.join(' ').split('');

  return arrStr.join('');
};