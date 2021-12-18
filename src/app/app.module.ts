import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { PageMainComponent } from './components/pages/page-main/page-main.component';
import { PageErrorComponent } from './components/pages/page-error/page-error.component';
import { HeaderComponent } from './shared/components/blocks/header/header.component';
import { FooterComponent } from './shared/components/blocks/footer/footer.component';
import { PageAutoComponent } from './components/pages/page-auto/page-auto.component';
import { PageContactsComponent } from './components/pages/page-contacts/page-contacts.component';
import { PageTestDriveComponent } from './components/pages/page-test-drive/page-test-drive.component';
import { PageMainContentComponent } from './components/pages/page-main-content/page-main-content.component';
import { PageAuthComponent } from './components/pages/page-auth/page-auth.component';
import { PageRegisterComponent } from './components/pages/page-register/page-register.component';
import { MatNativeDateModule } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    PageMainComponent,
    PageErrorComponent,
    HeaderComponent,
    FooterComponent,
    PageAutoComponent,
    PageContactsComponent,
    PageTestDriveComponent,
    PageMainContentComponent,
    PageAuthComponent,
    PageRegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
