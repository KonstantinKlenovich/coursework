import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public userSubject = this.authService.userSubject;

  constructor(private authService: AuthService) { }

  public logout(): void {
    this.authService.logout();
  }

}
