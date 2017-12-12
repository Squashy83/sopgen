import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PdfManagerService } from './_services/pdf-manager.service';
import { environment } from './../environments/environment';
import { SopInfoComponent } from './sop-info/sop-info.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AlertModule, ButtonsModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { SopComponent } from './sop/sop.component';
import { UserComponent } from './user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { SopDetailComponent } from './sop-detail/sop-detail.component';
import { SopEditComponent } from './sop-edit/sop-edit.component';
import { SopPdfManagerComponent } from './sop-pdf-manager/sop-pdf-manager.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './_services/login.service';
import { LoginGuardService } from './_services/login_guard.service';
import { SopStepsComponent } from './sop-steps/sop-steps.component';
import { SopResponsiblesComponent } from './sop-responsibles/sop-responsibles.component';
import { SopFooterComponent } from './sop-footer/sop-footer.component';
import { SopGeneratepdfComponent } from './sop-generatepdf/sop-generatepdf.component';

// import { Injectable } from '@angular/core';
// import { CanActivate } from '@angular/router';

// @Injectable()
// class LoginGuard implements CanActivate {
//   constructor(private _loginService: LoginService) { }

//   canActivate() {
//     return this._loginService.isLoggedIn();
//   }
// }

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.TRANSLATE_FILE, '.json');
}

// AoT requires an exported function for factories
/*export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}*/

const appRoutes: Routes = [
  {
    path: 'sop-info',
    component: SopInfoComponent,
    canActivate: [LoginGuardService],
    data: { title: 'Sop Generic Info' }
  },
  {
    path: 'sop-steps',
    component: SopStepsComponent,
    canActivate: [LoginGuardService],
    data: { title: 'Sop Steps' }
  },
  {
    path: 'sop-responsibles',
    component: SopResponsiblesComponent,
    canActivate: [LoginGuardService],
    data: { title: 'Sop Responsibles Info' }
  },
  {
    path: 'sop-footer',
    component: SopFooterComponent,
    canActivate: [LoginGuardService],
    data: { title: 'Sop Footer' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Please Login' }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    SopComponent,
    UserComponent,
    SopDetailComponent,
    SopInfoComponent,
    SopEditComponent,
    SopPdfManagerComponent,
    LoginComponent,
    SopStepsComponent,
    SopResponsiblesComponent,
    SopFooterComponent,
    SopGeneratepdfComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AlertModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    ButtonsModule.forRoot()
  ],
  providers: [LoginService, LoginGuardService, PdfManagerService],
  bootstrap: [AppComponent]
})






export class AppModule { }
