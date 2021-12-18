import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable, filter, Subject, BehaviorSubject } from 'rxjs';
import { convertObservableToBehaviorSubject } from 'src/app/shared/helpers/convertObservableToBehaviorSubject';
import { AutoWithId } from 'src/app/shared/interfaces/auto.interface';
import { TestDriveInfo } from 'src/app/shared/interfaces/test-drive.interface';
import { UserEmailAndNameAndId } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AutoService } from 'src/app/shared/services/auto.service';
import { TestDriveService } from 'src/app/shared/services/test-drive.service';
import { DateMoreCurrentDateValidator } from 'src/app/shared/validators/date-more-current-date.validator';

interface formValues {
  car: AutoWithId;
  date: Date;
}

@UntilDestroy()
@Component({
  selector: 'app-page-test-drive',
  templateUrl: './page-test-drive.component.html',
  styleUrls: ['./page-test-drive.component.scss']
})
export class PageTestDriveComponent implements OnInit {

  public formTestDrive: FormGroup = new FormGroup({
    'date': new FormControl(null, [Validators.required], [DateMoreCurrentDateValidator]),
    'car': new FormControl(null, [Validators.required])
  });

  public allAutoObservable: Observable<AutoWithId[]> = this.autoService.getAllAuto();

  public carSelectObservable: Observable<AutoWithId> = this.formTestDrive.valueChanges.pipe(
    map((item: formValues) => {
      return item.car;
    }),
    filter(item => item !== null)
  );
  public carSelectBehaviourSubject: BehaviorSubject<AutoWithId | null> = convertObservableToBehaviorSubject(this.carSelectObservable, null);

  public allRecordsTestDriveObservable: Observable<TestDriveInfo[]> = this.testDriveService.getAllRecordsTestDrive();

  public displayedColumns: string[] = ['id', 'email', 'date', 'auto'];

  constructor(
    private autoService: AutoService,
    private testDriveService: TestDriveService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    
  }

  public onSubmit(form: FormGroup): void {

    form.disable();

    const user: UserEmailAndNameAndId | null = this.authService.userSubject.value;
    const auto: AutoWithId | null = this.carSelectBehaviourSubject.value;
    const date: Date | any = form.get('date')?.value;

    if (user !== null && auto !== null && date instanceof Date) {
      const testDriveInfo: TestDriveInfo = {user, auto, date}; 
      this.testDriveService.signUpForTestDrive(testDriveInfo).pipe(
        untilDestroyed(this)
      ).subscribe(name => {
        this.allRecordsTestDriveObservable = this.testDriveService.getAllRecordsTestDrive();
        this.snackBar.open('Ваша заявка на тест-драйв отправлена. С Вами свяжутся', 'ОК');
      }); 
    } else {
      this.snackBar.open('Ошибка заполения формы', 'ОК');
    }

  }

}
