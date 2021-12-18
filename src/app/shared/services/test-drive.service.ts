import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NameTestDrive, TestDriveInfo, TestDriveInfoFirebase } from '../interfaces/test-drive.interface';

@Injectable({
  providedIn: 'root'
})
export class TestDriveService {

  private url: string = 'https://course-work-auto-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(
    private http: HttpClient
  ) { }

  public signUpForTestDrive(testDriveInfo: TestDriveInfo): Observable<NameTestDrive> {
    return this.http.post<NameTestDrive>(`${this.url}/test-drive.json`, testDriveInfo);
  }

  public getAllRecordsTestDrive(): Observable<TestDriveInfo[]> {
    return this.http.get<TestDriveInfoFirebase>(`${this.url}/test-drive.json`).pipe(
      map(obj => {
        const arr: TestDriveInfo[] = [];
        for (const key in obj) {
          const newObj: TestDriveInfo = Object.assign({'id': key}, obj[key]); 
          arr.push(newObj);
        }
        return arr;
      })
    );
  }
}
