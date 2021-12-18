import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAuthComponent } from './components/pages/page-auth/page-auth.component';
import { PageAutoComponent } from './components/pages/page-auto/page-auto.component';
import { PageContactsComponent } from './components/pages/page-contacts/page-contacts.component';
import { PageErrorComponent } from './components/pages/page-error/page-error.component';
import { PageMainContentComponent } from './components/pages/page-main-content/page-main-content.component';
import { PageMainComponent } from './components/pages/page-main/page-main.component';
import { PageRegisterComponent } from './components/pages/page-register/page-register.component';
import { PageTestDriveComponent } from './components/pages/page-test-drive/page-test-drive.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: PageMainComponent, children: [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', component: PageMainContentComponent },
    { path: 'auto', component: PageAutoComponent },
    { path: 'contacts', component: PageContactsComponent },
    { path: 'test-drive', component: PageTestDriveComponent, canActivate: [AuthGuard] },
    { path: 'auth', component: PageAuthComponent },
    { path: 'register', component: PageRegisterComponent },
    { path: 'error', component: PageErrorComponent, pathMatch: 'full' }
  ] 
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
