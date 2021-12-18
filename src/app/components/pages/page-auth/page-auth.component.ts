import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorMain } from 'src/app/shared/interfaces/global.interface';
import { UserPasswordAndEmail } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-page-auth',
  templateUrl: './page-auth.component.html',
  styleUrls: ['./page-auth.component.scss']
})
export class PageAuthComponent {

  public authForm: FormGroup = new FormGroup({
    'email': new FormControl('test@gmail.com', [Validators.required, Validators.email]),
    'password': new FormControl('12345678', [Validators.required, Validators.minLength(8)])
  });

  public isAuthentificated(): boolean {
    return this.authService.isAuthentificated();
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  public onSubmit(form: FormGroup): void {

    form.disable();

    const user: UserPasswordAndEmail = {
      email: form.get('email')?.value,
      password: form.get('password')?.value
    };

    this.authService.login(user)
    .pipe(
      untilDestroyed(this)
    )
    .subscribe({
      next: () => {
        this.router.navigate(['/auto']);
      },
      error: (err: ErrorMain) => {
        this._snackBar.open(err.errorMessage, 'OK');
        console.error(err.error);
        form.enable();
      }
    })
  }

  logOut(): void {
    this.authService.logout();
  }

}
