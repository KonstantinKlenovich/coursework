import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorMain } from 'src/app/shared/interfaces/global.interface';
import { UserPasswordAndEmailAndName } from 'src/app/shared/interfaces/user.interface';
import { RegisterService } from 'src/app/shared/services/register.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegisterComponent {

  public registerForm: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required]),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  public onSubmit(form: FormGroup): void {

    form.disable();

    const user: UserPasswordAndEmailAndName = {
      name: form.get('name')?.value,
      email: form.get('email')?.value,
      password: form.get('password')?.value
    };

    this.registerService.addUser(user)
    .pipe(
      untilDestroyed(this)
    )
    .subscribe({
      next: (res) => {
        this.router.navigate(['auth']);
      },
      error: (err: ErrorMain) => {
        form.enable();
        this._snackBar.open(err.errorMessage, 'OK');
      }
    })
    
  }

}
